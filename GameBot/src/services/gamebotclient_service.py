import ingescape as igs

class GameBotClientService:
    agent_id: str
    services: dict[str, str]

    def __init__(self):
        self.agent_id = "GameBotClient"
        self.services = {
            "displayGame": "displayGame",
            "displayHome": "displayHome",
        }

    def display_game(self, player_id: str, game_id: str):
        service_args = (player_id, game_id)
        igs.service_call(
            self.agent_id,
            self.services["displayGame"],
            service_args,
            ""
        )
    
    def display_home(self, player_id: str, message: str):
        service_args = (player_id, message)
        igs.service_call(
            self.agent_id,
            self.services["displayHome"],
            service_args,
            ""
        )