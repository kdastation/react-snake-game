import { Sprites } from "../sprites/sprites";
import { ISprites } from "../types/sprites";
import { Board } from "./Board";
import { Snake } from "./Snake";
import { Apple } from "./Apple";
import { Bomb } from "./Bomb";
import { TInterval } from "../types/interval";
import { Dispatch, SetStateAction } from "react";

export class Game {
  private isRun: boolean;
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D | null;
  readonly sprites: ISprites = {
    background: null,
    cell: null,
    snakeBody: null,
    snakeHead: null,
    apple: null,
    bomb: null,
  };
  public board: Board;
  public snake: Snake;
  public apple: Apple;
  public bomb: Bomb;
  readonly countRequiredImages: number = 0;
  private countLoadedImages: number = 0;
  private intervalUpdateSnake: TInterval | null = null;
  private intervalUpdateBomb: TInterval | null = null;
  private intervalUpdateRender: TInterval | null = null;
  readonly setIsRunGame: Dispatch<SetStateAction<boolean>>;

  constructor(
    canvas: HTMLCanvasElement,
    setIsRunGame: Dispatch<SetStateAction<boolean>>
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.countLoadedImages = 0;
    this.countRequiredImages = Object.keys(this.sprites).length;
    this.board = new Board(this, 15);
    this.snake = new Snake(this, this.board);
    this.apple = new Apple(this, this.board);
    this.bomb = new Bomb(this, this.board);
    this.isRun = false;
    this.setIsRunGame = setIsRunGame;
  }

  public start() {
    this.preloadImages(() => {
      this.run();
    });
  }

  public stop() {
    this.setIsRunGame(false);
    this.isRun = false;
    this.clearIntervals();
  }

  /**
   * Загружает все изображения/спрайты, и вызывает отрисовку, когда загрузка прошла успешно
   * @param callback - функция, которую нужно вызвать, когда ВСЕ спрайты загрузятся
   * @private
   */
  private preloadImages(callback: () => void) {
    for (const key in this.sprites) {
      // @ts-ignore
      this.sprites[key] = new Image();
      // @ts-ignore
      this.sprites[key].src = Sprites[key];
      // @ts-ignore
      this.sprites[key].addEventListener("load", () => {
        this.onAssetsLoad(() => {
          callback();
        });
      });
    }
  }

  /**
   * Проверяет, все ли изображения загрузились.
   * Если да, то вызовет метод, переданный в аргументе
   * @param callback
   * @private
   */
  private onAssetsLoad(callback: () => void) {
    this.countLoadedImages += 1;
    if (this.countLoadedImages >= this.countRequiredImages) {
      callback();
    }
  }

  /**
   * Создает все сущности, которые нужны для игры
   * @private
   */
  private createModels() {
    this.board.createCells();
    this.snake.create();
    this.apple.create();
    this.bomb.create();
  }

  private render() {
    requestAnimationFrame(() => {
      const { background, cell, snakeBody } = this.sprites;
      const isCanRender = background && cell && snakeBody;
      if (isCanRender) {
        this.context?.clearRect(0, 0, 640, 360);
        this.context?.drawImage(background, 0, 0);
        this.board.render();
        this.snake.render();
        this.apple.render();
        this.bomb.render();
      }
    });
  }

  /**
   * Двигает змейку и обновляет(перерисовывает) игровое поле
   * @private
   */
  private update() {
    this.intervalUpdateRender = setInterval(() => {
      this.render();
    }, 150);

    this.intervalUpdateSnake = setInterval(() => {
      this.snake.move();
    }, 150);

    this.intervalUpdateBomb = setInterval(() => {
      this.bomb.create();
    }, 1500);
  }

  private run() {
    this.setIsRunGame(true);
    this.isRun = true;
    this.createModels();
    this.update();
  }

  private clearIntervals() {
    if (this.intervalUpdateRender) {
      window.clearInterval(this.intervalUpdateRender);
    }
    if (this.intervalUpdateSnake) {
      window.clearInterval(this.intervalUpdateSnake);
    }

    if (this.intervalUpdateBomb) {
      window.clearInterval(this.intervalUpdateBomb);
    }
  }
}
