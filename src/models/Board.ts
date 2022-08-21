import { Game } from "./Game";
import { ICell } from "../types/cell";
import { IGameObject } from "../types/game-object";
import { TBoardObjects } from "../types/board-objects";

export class Board implements IGameObject {
  public game: Game;
  private cells: ICell[] = [];
  readonly size: number;

  constructor(game: Game, size: number) {
    this.game = game;
    this.size = size;
  }

  public createCells() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const cell = this.createCell(row, col);
        this.cells.push(cell);
      }
    }
  }

  public getCells() {
    return this.cells;
  }

  public render() {
    const spriteCell = this.getSelfSprite();
    this.cells.forEach((cell) => {
      this.game.context?.drawImage(spriteCell, cell.x, cell.y);
    });
  }

  public getCell(row: number, column: number) {
    const foundCell = this.cells.find((cell) => {
      return cell.row === row && cell.col === column;
    });
    return foundCell;
  }

  public removeObject(cell: ICell, type: TBoardObjects) {
    const selfCell = this.getCell(cell.row, cell.col);
    if (selfCell) {
      selfCell[type] = false;
    }
  }

  public setObjectOnCell(cell: ICell, type: TBoardObjects) {
    const selfCell = this.getCell(cell.row, cell.col);
    if (selfCell) {
      selfCell[type] = true;
    }
  }

  private createCell(row: number, col: number) {
    const cellSprite = this.getSelfSprite();
    const cellSize = cellSprite?.width;

    const cell: ICell = {
      row,
      col,
      x: cellSize * col,
      y: cellSize * row,
    };

    return cell;
  }

  public getSelfSprite() {
    return this.game.sprites.cell as HTMLImageElement;
  }
}
