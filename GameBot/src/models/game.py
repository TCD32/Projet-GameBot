from dataclasses import dataclass

from models.color import Color
from models.game_state import GameState


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
    
    def start() -> None:
        raise Exception("Game method start() is not implemented !")

    def command(command: str) -> None:
        raise Exception("Game method command() is not implemented !")
    
    def finished() -> bool:
        raise Exception("Game method finished() is not implemented !")

    def reset() -> None:
        raise Exception("Game method reset() is not implemented !")
