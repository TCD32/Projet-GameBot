export interface GameCommand {
    gameId: string;
    playerId: string;
    command: {[key: string]: any}
}