from dataclasses import dataclass

@dataclass
class GameCommand :
    id: str
    cmd: dict
    player: str

    @staticmethod
    def from_dict(dict: dict) :
        g_id = dict.get("gameId", None)
        g_dict = dict.get("command", None)
        g_play = dict.get("playerId", None)

        if g_id == None : raise Exception("The game id is missing in the command !")
        if g_dict == None : raise Exception("The game command is missing in the command !")
        
        return GameCommand(g_id, g_dict, g_play)


