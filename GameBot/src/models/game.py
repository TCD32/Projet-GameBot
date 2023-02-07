from dataclasses import dataclass


from services.whiteboard_service import WhiteboardService
from models.color import Color
from models.game_state import GameState
from models.game_command import GameCommand


@dataclass
class Game:
    id: str
    title: str
    players: int
    description: str
    image: str
    color: Color
    state: GameState

    whiteboard_service: WhiteboardService

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
        self.state.game_running = True

    def command(self, command: GameCommand) -> None:
        raise Exception("Game method command() is not implemented !")
    
    def finished(self) -> bool:
        return (self.state.player_winner != None and not self.state.game_running)

    def reset(self) -> None:
        self.state.game_running = False
