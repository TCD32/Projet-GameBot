
from typing import List
from env import *

from models.game import Game
from models.game_command import GameCommand

import ingescape as igs


class GameTicTacToe(Game):
    grid: List[List[str]]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.grid = []

    def submit_proposition(self, value: int, x: int, y: int):
        self.grid[x][y] = value
        service_args = ( "cross" if value == 1 else "circle", x, y, 1, 1, "black", "black", 0)
        igs.service_call(AGENT_WHITEBOARD["id"], AGENT_WHITEBOARD["services"]["addShape"], service_args, "")
        

    def start(self) -> None:
        super().start()
        service_args = ("rectangle", 50, 20, 50, 3, "black", "black", 0)
        igs.service_call(AGENT_WHITEBOARD["id"], AGENT_WHITEBOARD["services"]["addShape"], service_args, "")
        service_args = ("rectangle", 50, 40, 50, 3, "black", "black", 0)
        igs.service_call(AGENT_WHITEBOARD["id"], AGENT_WHITEBOARD["services"]["addShape"], service_args, "")
        service_args = ("rectangle", 20, 50, 3, 50, "black", "black", 0)
        igs.service_call(AGENT_WHITEBOARD["id"], AGENT_WHITEBOARD["services"]["addShape"], service_args, "")
        service_args = ("rectangle", 40, 50, 3, 50, "black", "black", 0)
        igs.service_call(AGENT_WHITEBOARD["id"], AGENT_WHITEBOARD["services"]["addShape"], service_args, "")

    def command(self, command: GameCommand) -> None:
        return self.submit_proposition(int(command.player), command.cmd["x"], command.cmd["y"])

    def reset(self) -> None:
        self.grid = []
