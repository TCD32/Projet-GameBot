
from typing import List

from models.game import Game


class GameTicTacToe(Game):
    grid: List[List[str]]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.grid = []

    def submit_proposition(self, value: str, x: int, y: int):
        self.grid[x][y] = value
