import { ICell } from "../types/cell";
import { Game } from "./Game";
import { Board } from "./Board";
import { IDirections } from "../types/directions";
import { IDirection } from "../types/direction";
import { IGameObject } from "../types/game-object";

export class Snake implements IGameObject {
  public game: Game;
  private cells: ICell[] = [];
  private board: Board;
  private isMoving: boolean;
  private direction: IDirection;
  readonly directions: IDirections = {
    up: {
      row: -1,
      column: 0,
    },
    down: {
      row: 1,
      column: 0,
    },
    left: {
      row: 0,
      column: -1,
    },
    right: {
      row: 0,
      column: 1,
    },
  };

  constructor(game: Game, board: Board) {
    this.game = game;
    this.board = board;
    this.isMoving = false;
    this.direction = this.directions.up;
    this.addEventListeners();
  }

  public create() {
    const startCells = [
      { row: 7, col: 7 },
      { row: 8, col: 7 },
    ];
    for (let startCell of startCells) {
      const cell = this.board.getCell(startCell.row, startCell.col);
      if (cell) {
        this.cells.push(cell);
      }
    }
  }

  public render() {
    this.renderHead();
    this.renderBody();
  }

  public move() {
    if (!this.isMoving) return;

    const nextCell = this.getNextCell();

    const isEnd = !nextCell || nextCell.bomb || this.hasCell(nextCell);

    if (isEnd) {
      this.game.stop();
    }

    if (nextCell) {
      this.cells.unshift(nextCell);
      const cellHasFood = nextCell.food;
      if (cellHasFood) {
        this.onSnakeEat();
      } else {
        this.cells.pop();
      }
    }
  }

  public hasCell(cell: ICell) {
    return this.cells.find((cellSnake) => {
      return cellSnake.row === cell.row && cellSnake.col === cell.col;
    });
  }

  private onSnakeEat() {
    this.game.apple.create();
  }

  private renderHead() {
    const cellHead = this.getHeadSnake();
    const spiteHead = this.getSpiteHead();
    this.game.context?.drawImage(spiteHead, cellHead.x, cellHead.y);
  }

  private renderBody() {
    for (let index = 1; index < this.cells.length; index++) {
      const cell = this.cells[index];
      const spriteSnake = this.getSpriteBody();
      this.game.context?.drawImage(spriteSnake, cell.x, cell.y);
    }
  }

  private getSpriteBody() {
    return this.game.sprites.snakeBody as HTMLImageElement;
  }

  private getSpiteHead() {
    return this.game.sprites.snakeHead as HTMLImageElement;
  }

  private getHeadSnake() {
    return this.cells[0];
  }

  private getNextCell() {
    const head = this.getHeadSnake();
    const newRowHead = head.row + this.direction.row;
    const newColumnHead = head.col + this.direction.column;
    return this.board.getCell(newRowHead, newColumnHead);
  }

  private addEventListeners() {
    document.addEventListener("keydown", (event) => {
      this.changeDirection(event);
    });
  }

  private changeDirection(e: KeyboardEvent) {
    this.isMoving = true;
    const keyCode = e.keyCode;
    switch (keyCode) {
      case 68:
        this.direction = this.directions.right;
        break;
      case 65:
        this.direction = this.directions.left;
        break;
      case 87:
        this.direction = this.directions.up;
        break;
      case 83:
        this.direction = this.directions.down;
        break;
    }
  }
}
