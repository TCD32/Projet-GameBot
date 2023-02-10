import random

from models.game import Game
from models.game_command import GameCommand

class GameJustePrix(Game):
    MAX_VALUE = 1000
    value: int

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def submit_proposition(self, player_id: str, proposition: int):
        player = self.state.players[player_id]
        diff = self.value - proposition

        if (diff == 0):
            msg = ""
            self.state.player_winner = player
            self.state.game_running = False
        elif (diff > 0):
            msg = f"👤 {player.nickname}: C'est plus ! ➕"
        else:
            msg = f"👤 {player.nickname}: C'est moins ! ➖"

        self.whiteboard_service.chat(msg)

    def start(self):
        super().start()
        self.value = random.randint(0, self.MAX_VALUE)

    # formats commandes : {"value":int }
    def command(self, command: GameCommand) -> None:
        value = int(command.command.get("value", -1))
        player_id = command.player_id
        if value == -1:
            raise Exception("Juste_Prix : missing value in command :", command)

        self.submit_proposition(player_id, value)

    def finished(self):
        return super().finished()

    def reset(self) -> None:
        super().reset()
        self.value = random.randint(0, self.MAX_VALUE)
