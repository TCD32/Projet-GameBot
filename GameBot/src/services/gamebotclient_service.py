import ingescape as igs

class GameBotClientService:
    agent_id: str
    services: dict[str, str]

    def __init__(self):
        self.agent_id = "GameBotClient"
        self.services = {
            "displayGame": "displayGame",
        }

    def display_game(self, player_id: str, game_id: str):
        service_args = (player_id, game_id)
        igs.service_call(
            self.agent_id,
            self.services["displayGame"],
            service_args,
            ""
        )