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

from services.whiteboard_service import WhiteboardService
from services.gamebotclient_service import GameBotClientService
from services.logger_service import LoggerService
from services.game_service import GameService
from models.game_command import GameCommand
from models.player import Player


class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class GameBot(metaclass=Singleton):
    logger_service: LoggerService
    whiteboard_service: WhiteboardService
    gamebotclient_service: GameBotClientService
    game_service: GameService

    def __init__(self):
        # inputs
        self.commandI = None
        # outputs
        self._game_titleO = None

        self.logger_service = LoggerService("gamebot_logger")
        self.whiteboard_service = WhiteboardService()
        self.gamebotclient_service = GameBotClientService()
        self.game_service = GameService(
            self.whiteboard_service,
            self.gamebotclient_service
        )

    # inputs
    def on_command(self, command: str):
        self.logger_service.info(f"Received command {command}")

        dict_cmd = json.loads(command)
        game_cmd = GameCommand.from_dict(dict_cmd)
        self.game_service.execute_command(game_cmd)

    # outputs
    @property
    def game_titleO(self):
        return self._game_titleO

    @game_titleO.setter
    def game_titleO(self, value):
        self._game_titleO = value
        if self._game_titleO is not None:
            igs.output_set_string("game_title", self._game_titleO)

    # services
    def ready(self, sender_agent_name, sender_agent_uuid, playerJson, gameId):
        self.logger_service.info(f"Service ready{(playerJson, gameId)} called by {sender_agent_name}")

        player = Player.from_dict(json.loads(playerJson))
        self.game_service.ready(player, gameId)
