from dataclasses import dataclass


@dataclass
class Color:
    r: int
    g: int
    b: int
    a: int

    def to_dict(self):
        color_dict = {
            "r": self.r,
            "g": self.g,
            "b": self.b,
            "a": self.a,
        }

        return color_dict
    
    @staticmethod
    def from_dict(d: dict):
        c_r = d.get("r", None)
        c_g = d.get("g", None)
        c_b = d.get("b", None)
        c_a = d.get("a", None)

        if not c_r: raise Exception("The color r is missing in the color dict !")
        if not c_g: raise Exception("The color g is missing in the color dict !")
        if not c_b: raise Exception("The color b is missing in the color dict !")
        if not c_a: raise Exception("The color a is missing in the color dict !")
        
        return Color(c_r, c_g, c_b, c_a)
