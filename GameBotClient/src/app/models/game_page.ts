import { Game } from "./game";

export interface GamePage {
    game: Game | null

    onGameStart(): void;
    onGameResult(result: String): void;
}