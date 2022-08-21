import { FC, useEffect, useRef, useState } from "react";
import { Game as GameModel } from "../../models/Game";

const Game: FC = () => {
  const [runGame, setStartGame] = useState(false);
  const [isRunGame, setIsRunGame] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<GameModel | null>(null);

  const startGame = () => {
    setStartGame(true);
    if (canvasRef.current) {
      gameRef.current = new GameModel(canvasRef.current, setIsRunGame);
      gameRef.current?.start();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={640} height={360} />
      {!runGame || !isRunGame ? (
        <button onClick={startGame}>Начать игру</button>
      ) : null}
    </div>
  );
};

export { Game };
