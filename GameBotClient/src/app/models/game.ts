import { Color } from "./color";

export interface Game {
    id: String,
    title: String,
    players: number,
    description: String,
    image: String,
    color: Color,
}