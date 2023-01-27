from typing import Optional

from games.juste_prix import GameJustePrix
from games.tictactoe import GameTicTacToe
from models.game import Game
from models.color import Color
from models.game_state import GameState
from models.game_command import GameCommand


class GameService:
    games: dict[str, Game]
    running_game: Optional[Game]

    def __init__(self):
        self.games = {
            "0": GameJustePrix(
                id="0",
                title="Juste Prix",
                players=2,
                description="Le jeu du Juste Prix !",
                image="https://magicdice.tv/wp-content/uploads/LJP_Logo-1280x720.jpg",
                color=Color(170, 7, 107, 1),
                state=GameState()
            ),
            "1": GameTicTacToe(
                id="1",
                title="Tic Tac Toe",
                players=2,
                description="Le jeu du Tic Tac Toe !",
                image="https://wallpapercrafter.com/sizes/1920x1080/1146-gradient-color-faded-blue-4k.jpg",
                color=Color(240, 152, 25, 1),
                state=GameState()
            )
        }
        self.running_game = None


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


    def ready(self, player_id, game_id):
        if self.running_game is not None:
            raise Exception(
                f"Player {player_id} cannot ready for game {game_id} "
                f"because another game is already running."
            )
        
        # retrieving game
        game = self.get_game(game_id)

        # starting game if enough players are ready
        game_state = game.game_state
        game_state.players_ready += 1
        if game_state.players_ready == game_state.game.players:
            game_state.game_running = True
            self.start_game(game)

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
