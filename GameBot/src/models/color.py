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
