#!/usr/bin/env -P /usr/bin:/usr/local/bin python3 -B
# coding: utf-8

#
#  GameBot.py
#  GameBot version 1.0
#  Created by Ingenuity i/o on 2023/01/26
#
# Chat bot to play some games on the whiteboard
#
import ingescape as igs
import json

from services.game_service import GameService
from models.game_command import GameCommand


class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class GameBot(metaclass=Singleton):

    game_service: GameService

    def __init__(self):
        print("GAMEBOT CREATED")
        # inputs
        self.commandI = None
        # outputs
        self._resultO = None

        self.game_service = GameService()

    # inputs
    def on_command(self, command: str):
        dict_cmd = json.loads(command)
        game_cmd = GameCommand.from_dict(dict_cmd)
        self.game_service.execute_command(game_cmd)

    # outputs
    @property
    def resultO(self):
        return self._resultO

    @resultO.setter
    def resultO(self, value):
        self._resultO = value
        if self._resultO is not None:
            igs.output_set_string("result", self._resultO)

    # services
    def ready(self, sender_agent_name, sender_agent_uuid, playerId, gameId):
        self.gameService.ready(playerId, gameId)

    def getGames(self, sender_agent_name, sender_agent_uuid):
        # TODO: Find a way to return game list on Ingescape
        return self.gameService.get_games()

