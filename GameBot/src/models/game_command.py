from dataclasses import dataclass

@dataclass
class GameCommand :
    id: str
    cmd: dict
    player: str

    @staticmethod
    def from_dict(d: dict) :
        g_id = d.get("gameId", None)
        g_dict = d.get("command", None)
        g_play = d.get("playerId", None)

        if not g_id: raise Exception("The game id is missing in the command !")
        if not g_dict: raise Exception("The game command is missing in the command !")
        if not g_play: raise Exception("The game player is missing in the command !")
        
        return GameCommand(g_id, g_dict, g_play)


