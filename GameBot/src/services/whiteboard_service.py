import ingescape as igs

class WhiteboardService():
    agent_id: str
    services: dict[str, str]

    def __init__(self):
        self.agent_id = "Whiteboard"
        self.services = {
            "addShape": "addShape",
            "chat": "chat",
            "clear": "clear",
        }

    def add_shape(
        self,
        type: str,
        x: int,
        y: int,
        width: int,
        height: int,
        fill: str,
        stroke: str,
        stroke_width: int,
    ):
        service_args = (type, x, y, width, height, fill, stroke, stroke_width)
        igs.service_call(self.agent_id, self.services["addShape"], service_args, "")

    def chat(self, message: str):
        service_args = (message)
        igs.service_call(self.agent_id, self.services["chat"], service_args, "")

    def clear(self):
        service_args = ()
        igs.service_call(self.agent_id, self.services["clear"], service_args, "")
    