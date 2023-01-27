from typing import Optional


class GameState:
    game_running: bool
    players_ready: dict[str, bool]
    player_winner: Optional[str]

    def __init__(self):
        self.game_running = False
        self.players_ready = {}
        self.player_winner = None

    def to_dict(self):
        game_state_dict = {
            "game_running": self.game_running,
            "players_ready": self.players_ready,
            "player_winner": self.player_winner,
        }

        return game_state_dict
