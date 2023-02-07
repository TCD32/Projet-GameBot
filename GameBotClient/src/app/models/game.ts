import { Color } from "./color";

export interface Game {
    id: string,
    title: string,
    players: number,
    description: string,
    image: string,
    color: Color,
}