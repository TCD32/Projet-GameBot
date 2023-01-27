//
//  index.js
//  GameBot version 1.0
//  Created by Ingenuity i/o on 2023/01/24
//
//  Chat bot to play some games
//  Copyright © 2022 Ingenuity i/o. All rights reserved.
//

//server connection
function isConnectedToServerChanged(isConnected)
{
    if (isConnected)
        console.log("Connected");
    else
        console.log("Not connected");
}

IGS.netSetServerURL("ws://172.23.240.1:5000");
IGS.agentSetName("GameBotClient");
IGS.observeWebSocketState(isConnectedToServerChanged);

IGS.definitionSetDescription("GameBot client providing UI to play its games and synchronocity management");
IGS.definitionSetVersion("1.0");

IGS.outputCreate("command", iopTypes.IGS_STRING_T, "");

//actually start ingescape
IGS.start();

