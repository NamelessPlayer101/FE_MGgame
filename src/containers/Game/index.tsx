import React from "react";
import { socket } from "../../services/socket";
import { Stage, Layer, Circle } from "react-konva";
import { IPlayerProps } from "../../models/Player";

interface IKeys {
  KeyW: {
    pressed: boolean;
  };
  KeyA: {
    pressed: boolean;
  };
  KeyS: {
    pressed: boolean;
  };
  KeyD: {
    pressed: boolean;
  };
}

function Game() {
  const SPEED = 5;
  const [ping, setPing] = React.useState<number>(0);
  const [isShowInput, setIsShowInput] = React.useState(true);
  const [keys, setKeys] = React.useState<IKeys>({
    KeyW: {
      pressed: false,
    },
    KeyA: {
      pressed: false,
    },
    KeyS: {
      pressed: false,
    },
    KeyD: {
      pressed: false,
    },
  });
  const [poision, setPoision] = React.useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [players, setPlayers] = React.useState<IPlayerProps[]>([
    {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 15,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      username: "test",
    },
    {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 15,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      username: "test",
    },
  ]);

  React.useEffect(() => {
    socket.connect();
    socket.on("game", handleGameOn);

    const gameInterval = setInterval(() => {
      let deltaX = 0;
      let deltaY = 0;

      if (keys.KeyW.pressed) {
        deltaY -= SPEED;
      }
      if (keys.KeyA.pressed) {
        deltaX -= SPEED;
      }
      if (keys.KeyS.pressed) {
        deltaY += SPEED;
      }
      if (keys.KeyD.pressed) {
        deltaX += SPEED;
      }

      if (deltaX !== 0 && deltaY !== 0) {
        // Theo chuẩn toán học thì là sqrt 2. Nhưng đang để 2.45 cho cảm giác ổn hơn
        const diagonalSpeed = SPEED / Math.sqrt(2.45);
        deltaX *= diagonalSpeed / SPEED;
        deltaY *= diagonalSpeed / SPEED;
      }

      setPoision((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }, 15);

    const pingInterval = setInterval(() => {
      const start = Date.now();
      socket.emit("ping", () => {
        const duration = Date.now() - start;
        setPing(duration);
      });
    }, 5000);

    return () => {
      clearInterval(pingInterval);
      clearInterval(gameInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      socket.off("game", handleGameOn);
      socket.disconnect();
    };
  }, []);

  const handleGameOn = (data: any) => {
    console.log(data);
  };

  const onSubmit = (event: any) => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    socket.emit("game", "test");
    event.preventDefault();
    setIsShowInput(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code in keys) {
      setKeys((prev: IKeys) => {
        const newKeys = { ...prev };
        newKeys[e.code as keyof IKeys].pressed = true;
        return newKeys;
      });
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code in keys) {
      setKeys((prev: IKeys) => {
        const newKeys = { ...prev };
        newKeys[e.code as keyof IKeys].pressed = false;
        return newKeys;
      });
    }
  };

  const handleVisibilityChange = () => {
    console.log("Sự kiện chuyển tab trong trình duyệt");
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };

  const handleWindowBlur = () => {
    console.log("Cửa sổ trình duyệt blur (Chuyển sang cửa sổ khác)");
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };

  const handleWindowFocus = () => {
    console.log("Cửa sổ trình duyệt focus");
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  };

  return (
    <form onSubmit={onSubmit} className="game">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle
            x={poision.x}
            y={poision.y}
            radius={15}
            fill="white"
            shadowBlur={20}
          />
          {players.map((player, index) => (
            <Circle
              key={index}
              x={player.x}
              y={player.y}
              radius={player.radius}
              fill={player.color}
              shadowBlur={20}
            />
          ))}
        </Layer>
      </Stage>
      <div className="game-ping">{`${ping} ms`}</div>
      <div
        className="name-player"
        style={{ display: isShowInput ? "flex" : "none" }}
      >
        <div>Name player</div>
        <input type="text" className="name-player-input" name="playerName" />
        <button type="submit" className="button btn-primary">
          Game on!
        </button>
      </div>
    </form>
  );
}

export default Game;
