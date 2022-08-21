import { IGameObject } from "../types/game-object";
import { Game } from "./Game";
import { Board } from "./Board";
import { BoardObject } from "./BoardObject";

export class Apple extends BoardObject implements IGameObject {
  constructor(game: Game, board: Board) {
    super(game, board);
  }

  public getSelfSprite(): HTMLImageElement {
    return this.game.sprites.apple as HTMLImageElement;
  }

  public create() {
    super.create("food");
  }

  public render() {
    const spriteApple = this.getSelfSprite();
    super.render(spriteApple);
  }
}
