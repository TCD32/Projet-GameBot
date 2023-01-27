
import random

from models.game import Game
from models.game_command import GameCommand


class GameJustePrix(Game):
    MAX_VALUE = 1000

    value: int

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.value = random.randint(0, self.MAX_VALUE)

    def submit_proposition(self, proposition: int):
        diff = self.value - proposition

        if (diff == 0):
            res = "EEEEEt c'est gg gros bg!"
        elif (diff > 0):
            res = "C'est plus"
        else:
            res = "C'est moins"

        return res

    def command(self, command: GameCommand) -> None:
        return self.submit_proposition(int(command.cmd["value"]))

    def reset(self) -> None:
        self.value = random.randint(0, self.MAX_VALUE)