
from typing import List

from models.game import Game
from models.game_command import GameCommand


class GameTicTacToe(Game):
    grid: List[List[str]]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.grid = []

    def submit_proposition(self, value: int, x: int, y: int):
        self.grid[x][y] = value
        

    def start(self) -> None:
        super().start()
        # Draw tictactoe shape

    def command(self, command: GameCommand) -> None:
        return self.submit_proposition(int(command.player), command.cmd["x"], command.cmd["y"])

    def reset(self) -> None:
        self.grid = []
