import { Game } from "../models/Game";

export interface IGameObject {
  game: Game;
  render(): void;
}
