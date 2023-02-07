from typing import Optional


from services.whiteboard_service import WhiteboardService
from services.gamebotclient_service import GameBotClientService
from games.juste_prix import GameJustePrix
from games.tictactoe import GameTicTacToe
from games.puissance_4 import GamePuissance4
from models.game import Game
from models.color import Color
from models.player import Player
from models.game_state import GameState
from models.game_command import GameCommand


class GameService:
    games: dict[str, Game]
    running_game: Optional[Game]

    whiteboard_service: WhiteboardService
    gamebotclient_service: GameBotClientService

    def __init__(
        self,
        whiteboard_service: WhiteboardService,
        gamebotclient_service: GameBotClientService,
    ):
        self.games = {
            "0": GameJustePrix(
                id="0",
                title="Juste Prix",
                players=2,
                description="Le jeu du Juste Prix !",
                image="https://magicdice.tv/wp-content/uploads/LJP_Logo-1280x720.jpg",
                color=Color(170, 7, 107, 1),
                state=GameState(),
                whiteboard_service=whiteboard_service,
            ),
            "1": GameTicTacToe(
                id="1",
                title="Tic Tac Toe",
                players=2,
                description="Le jeu du Tic Tac Toe !",
                image="https://wallpapercrafter.com/sizes/1920x1080/1146-gradient-color-faded-blue-4k.jpg",
                color=Color(240, 152, 25, 1),
                state=GameState(),
                whiteboard_service=whiteboard_service,
            ),
            "2": GamePuissance4(
                id="2",
                title="Puissance 4",
                players=2,
                description="Le jeu du Puissance 4 ! Unlimited POOOOOOOWER !",
                image="https://static.wikia.nocookie.net/chainsaw-man/images/7/7b/MakimaP.png/revision/latest?cb=20220213091438&path-prefix=fr",
                color=Color(666, 666, 666, 666),
                state=GameState(),
                whiteboard_service=whiteboard_service,
            )
        }
        self.running_game = None
        self.whiteboard_service = whiteboard_service
        self.gamebotclient_service = gamebotclient_service


    def get_game(self, game_id: str):
        game = self.games.get(game_id, None)
        if not game:
            raise Exception(
                f"Game {game_id} does not exist."
            )
        
        return game
    
    def get_games(self):
        # TODO: Stringify should be done outside GameService
        # games_to_string = json.dumps([game_state.game.to_dict() for game_state in self.games_states])
        return list(self.games.values())


    def ready(self, player: Player, game_id: str):
        if self.running_game is not None:
            raise Exception(
                f"Player {player.to_dict()} cannot ready for game {game_id} "
                f"because another game is already running."
            )
        
        # retrieving game
        game = self.get_game(game_id)

        # updating ready players
        message = ""
        if not game.state.players.get(player.id, None):
            game.state.players[player.id] = player
            message = f"{player.nickname} est prêt pour {game.title} ! ({len(game.state.players)}/{game.players})"
        else:
            game.state.players.pop(player.id)
            message = f"{player.nickname} n'est plus prêt pour {game.title} ! ({len(game.state.players)}/{game.players})"
        
        # sending chat to Whiteboard
        self.whiteboard_service.chat(message)

        # starting game if enough players are ready
        if len(game.state.players) == game.players:
            game.state.game_running = True
            self.start_game(game.id)

    def start_game(self, game_id: str):
        if self.running_game is not None:
            raise Exception(
                f"Cannot start game {game.id} because another "
                f"is already running."
            )
        
        # retrieving game
        game = self.get_game(game_id)
        
        # starting game
        self.running_game = game
        game.start()
        
        # tells game bot clients to display correct UI
        for player_id in list(game.state.players.keys()):
            self.gamebotclient_service.display_game(player_id, game.id)
        
        # clear Whiteboard
        self.whiteboard_service.clear()

        # send chat to Whiteboard
        self.whiteboard_service.chat(f"Le jeu {game.title} commence !")
        self.whiteboard_service.chat(f"Joueurs: {', '.join([p.nickname for p in game.state.players.values()])}")

    def execute_command(self, game_cmd: GameCommand):
        game_id = game_cmd.id
        command = game_cmd.cmd
        
        if self.running_game is None:
            raise Exception(
                f"Cannot execute command {command} because "
                f"no game is currently running."
            )
        
        if self.running_game.id != game_id:
            raise Exception(
                f"Cannot execute command {command} for game {game_id} because "
                f"game {self.running_game.id} is already running."
            )
        
        # execute game command
        self.running_game.command(command)

        # check game termination
        if self.running_game.finished():
            self._end_running_game()

    # utils
    def _end_running_game(self):
        self.running_game.reset()
        self.running_game = None

    def _is_game_running(self):
        return any([game_state.game_running for game_state in self.games_states])

    def _is_game_available(self, game_id: str):
        try:
            self.get_game(game_id)
            return True
        except Exception:
            return False
