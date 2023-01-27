from env import *
from dataclasses import dataclass

from models.color import Color
from models.game_state import GameState
from models.game_command import GameCommand

import ingescape as igs


@dataclass
class Game:
    id: str
    title: str
    players: int
    description: str
    image: str
    color: Color
    state: GameState

    def to_dict(self):
        game_dict = {
            "id": self.id,
            "title": self.title,
            "players": self.players,
            "description": self.description,
            "image": self.image,
            "color": self.color,
            "state": self.state.to_dict(),
        }

        return game_dict
    
    def start(self) -> None:
        print(f"Game {self.title} starting...")
        service_args = (f" {self.title} started !")
        igs.service_call(AGENT_WHITEBOARD["id"], AGENT_WHITEBOARD["services"]["chat"], service_args, "")

    def command(self, command: GameCommand) -> None:
        raise Exception("Game method command() is not implemented !")
    
    def finished(self) -> bool:
        return (self.state.player_winner != None and not self.state.game_running)

    def reset(self) -> None:
        raise Exception("Game method reset() is not implemented !")
