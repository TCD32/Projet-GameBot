from typing import Optional
from models.player import Player

class GameState:
    game_running: bool
    players: dict[str, Player]
    player_winner: Optional[Player]

    def __init__(self):
        self.game_running = False
        self.players = {}
        self.player_winner = None

    def to_dict(self):
        game_state_dict = {
            "game_running": self.game_running,
            "players": {i: p.to_dict() for i, p in self.players.items()},
            "player_winner": self.player_winner.to_dict() if self.player_winner else None,
        }

        return game_state_dict
