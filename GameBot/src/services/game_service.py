import ingescape as igs

from typing import Optional

from services.whiteboard_service import WhiteboardService
from services.gamebotclient_service import GameBotClientService
from games.juste_prix import GameJustePrix
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
            "1": GamePuissance4(
                id="1",
                title="Puissance 4",
                players=2,
                description="Le jeu du Puissance 4 ! Unlimited POOOOOOOWER !",
                image="https://susancall.com/wp-content/uploads/2014/04/games-1043006_1920-1080x675.jpg",
                color=Color(37, 150, 200, 1),
                state=GameState(),
                whiteboard_service=whiteboard_service,
            ),
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
            message = f"✔️ {player.nickname} est prêt pour {game.title} ! ({len(game.state.players)}/{game.players})"
        else:
            game.state.players.pop(player.id)
            message = f"❌ {player.nickname} n'est plus prêt pour {game.title} ! ({len(game.state.players)}/{game.players})"
        
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
        self.whiteboard_service.send_game_title(game.title)
        self.whiteboard_service.chat(f"🎲 Le jeu {game.title} commence 🎲")
        self.whiteboard_service.chat(f"👥 Joueurs: {', '.join([p.nickname for p in game.state.players.values()])}")

    def execute_command(self, game_cmd: GameCommand):
        game_id = game_cmd.game_id
        
        if self.running_game is None:
            raise Exception(
                f"Cannot execute command {game_cmd} because "
                f"no game is currently running."
            )
        
        if self.running_game.id != game_id:
            raise Exception(
                f"Cannot execute command {game_cmd} because "
                f"game {self.running_game.title} is already running."
            )
        
        # execute game command
        self.running_game.command(game_cmd)

        # check game termination
        if self.running_game.finished():
            self.end_running_game()

    def end_running_game(self):
        winner = self.running_game.state.player_winner

        # send chats to whiteboard
        self.whiteboard_service.chat(f"🏁 {self.running_game.title} est terminé 🏁")
        self.whiteboard_service.chat(f"🏆 {winner.nickname} est le grand gagnant ! Bravo 🥳")

        # tells game bot clients to display correct UI
        for player_id in list(self.running_game.state.players.keys()):
            message = "😕 Dommage, vous avez perdu... Retentez votre chance une autre fois !"
            if player_id == winner.id:
                message = "🥳 Bien joué, vous avez gagné !"
            self.gamebotclient_service.display_home(player_id, message)

        # reset state
        self.whiteboard_service.send_game_title("Whiteboard")
        self.running_game.reset()
        self.running_game = None

    # utils
    def _is_game_running(self):
        return any([game_state.game_running for game_state in self.games_states])

    def _is_game_available(self, game_id: str):
        try:
            self.get_game(game_id)
            return True
        except Exception:
            return False
