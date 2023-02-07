from dataclasses import dataclass
from models.color import Color

@dataclass
class Player:
    id: str
    nickname: str
    # TODO: color: Color
    color: str

    def to_dict(self):
        player_dict = {
            "id": self.id,
            "nickname": self.nickname,
            "color": self.color,
        }

        return player_dict
    
    
    @staticmethod
    def from_dict(d: dict):
        p_id = d.get("id", None)
        p_nickname = d.get("nickname", None)
        #TODO: p_color = Color.from_dict(d.get("color", {}))
        p_color = d.get("color", None)

        if not p_id: raise Exception("The player id is missing in the player dict !")
        if not p_nickname: raise Exception("The player nickname is missing in the player dict !")
        if not p_color: raise Exception("The player color is missing in the player dict !")
        
        return Player(p_id, p_nickname, p_color)
