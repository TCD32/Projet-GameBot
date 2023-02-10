import ingescape as igs

class WhiteboardService():
    agent_id: str
    services: dict[str, str]

    def __init__(self):
        self.agent_id = "Whiteboard"
        self.services = {
            "addShape": "addShape",
            "addImage": "addImage",
            "chat": "chat",
            "clear": "clear",
        }

    def add_shape(
        self,
        shape: str,
        x: float,
        y: float,
        width: float,
        height: float,
        fill: str,
        stroke: str,
        stroke_width: float,
    ):
        service_args = (shape, x, y, width, height, fill, stroke, stroke_width)
        igs.service_call(self.agent_id, self.services["addShape"], service_args, "")

    def add_image(
        self,
        img_b64: str,
        x: float,
        y: float,
        width: float,
        height: float,
    ):
        service_args = (img_b64, x, y, width, height)
        igs.service_call(self.agent_id, self.services["addImage"], service_args, "")

    def chat(self, message: str):
        if message != "":
            service_args = (message)
            igs.service_call(self.agent_id, self.services["chat"], service_args, "")

    def clear(self):
        service_args = ()
        igs.service_call(self.agent_id, self.services["clear"], service_args, "")
    
    def send_game_title(self, title: str):
        igs.output_set_string("game_title", title)
