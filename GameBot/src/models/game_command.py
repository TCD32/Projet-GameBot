from dataclasses import dataclass

@dataclass
class GameCommand :
    id: str
    cmd: str

    @staticmethod
    def from_dict(dict: dict) :
        g_id = dict.get("gameId", None)
        g_str = dict.get("gameCommand", None)

        if g_id == None : raise Exception("The game id is missing in the command !")
        if g_str == None : raise Exception("The game command is missing in the command !")
        
        return GameCommand(g_id, g_str)


