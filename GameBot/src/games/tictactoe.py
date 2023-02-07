
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

        self.whiteboard_service.add_shape(
            "circle", x, y, 1, 1, "red" if value == 1 else "blue", "black", 0
        )        

    def start(self) -> None:
        super().start()
        self.whiteboard_service.add_shape("rectangle", 50, 20, 50, 3, "black", "black", 0)
        self.whiteboard_service.add_shape("rectangle", 50, 40, 50, 3, "black", "black", 0)
        self.whiteboard_service.add_shape("rectangle", 20, 50, 3, 50, "black", "black", 0)
        self.whiteboard_service.add_shape("rectangle", 40, 50, 3, 50, "black", "black", 0)

    def command(self, command: GameCommand) -> None:
        return self.submit_proposition(int(command.player), command.cmd["x"], command.cmd["y"])

    def reset(self) -> None:
        self.grid = []
