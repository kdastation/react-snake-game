import { Game } from "./Game";
import { Board } from "./Board";
import { Random } from "../utils/Random";
import { ICell } from "../types/cell";
import { TBoardObjects } from "../types/board-objects";

export class BoardObject {
  public game: Game;
  protected board: Board;
  protected cell: ICell | null = null;

  constructor(game: Game, board: Board) {
    this.game = game;
    this.board = board;
  }

  protected getPoolCells() {
    const cellsBoard = this.board.getCells();
    const poolCells = cellsBoard.filter((cell) => {
      const isSnake = this.game.snake.hasCell(cell);
      const isFood = cell.food;
      const isBomb = cell.bomb;
      return !isSnake && !isBomb && !isFood;
    });
    return poolCells;
  }

  protected create(type: TBoardObjects) {
    if (this.cell) {
      this.board.removeObject(this.cell, type);
    }
    const poolCells = this.getPoolCells();
    const cell = Random.getRandomElementInArray(poolCells);
    this.board.setObjectOnCell(cell, type);
    this.cell = cell;
  }

  protected render(sprite: HTMLImageElement) {
    if (!this.cell) return;
    this.game.context?.drawImage(sprite, this.cell.x, this.cell.y);
  }
}
