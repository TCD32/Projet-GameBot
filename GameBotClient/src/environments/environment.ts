// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const agentWhiteboard = {
  id: "Whiteboard",
  inputs: {},
  outputs: {},
  services: {
    chat: "chat",
    clear: "clear",
    addText: "addText",
  }
};

export const agentGameBot = {
  id: "GameBot",
  inputs: {},
  outputs: {},
  services: {
    ready: "ready",
    getGames: "getGames",
  }
}

export const agentGameBotClient = {
  id: "GameBotClient",
  inputs: {},
  outputs: {
    command: "command"
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
