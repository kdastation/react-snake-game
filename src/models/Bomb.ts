import { Game } from "./Game";
import { Board } from "./Board";
import { BoardObject } from "./BoardObject";

export class Bomb extends BoardObject {
  constructor(game: Game, board: Board) {
    super(game, board);
  }

  public create() {
    super.create("bomb");
  }

  public render() {
    const spiteBomb = this.getBombSpite();
    super.render(spiteBomb);
  }

  private getBombSpite() {
    return this.game.sprites.bomb as HTMLImageElement;
  }
}
