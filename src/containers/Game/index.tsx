import React from "react";
import { socket } from "../../services/socket";
import { Stage, Layer, Circle } from "react-konva";

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
  let gameInterval: number | undefined = undefined;

  React.useEffect(() => {
    socket.connect();
    socket.on("game", handleGameOn);

    gameInterval = window.setInterval(() => {
      if (keys.KeyW.pressed) {
        console.log("KeyW pressed");
        setPoision((prev) => ({
          ...prev,
          y: prev.y - 5,
        }));
      }
      if (keys.KeyA.pressed) {
        console.log("KeyA pressed");
        setPoision((prev) => ({
          ...prev,
          x: prev.x - 5,
        }));
      }
      if (keys.KeyS.pressed) {
        console.log("KeyS pressed");
        setPoision((prev) => ({
          ...prev,
          y: prev.y + 5,
        }));
      }
      if (keys.KeyD.pressed) {
        console.log("KeyD pressed");
        setPoision((prev) => ({
          ...prev,
          x: prev.x + 5,
        }));
      }
    }, 15);

    const pingInterval = setInterval(() => {
      const start = Date.now();
      socket.emit("ping", () => {
        const duration = Date.now() - start;
        setPing(duration);
      });
    }, 5000);

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      clearInterval(pingInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      socket.off("game", handleGameOn);
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    console.log(JSON.stringify(keys));
  }, [keys]);

  const handleGameOn = (data: any) => {
    console.log(data);
  };

  const onSubmit = (event: any) => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
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
    setKeys({
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
    console.log("Sự kiện chuyển tab trong trình duyệt");
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };

  const handleWindowBlur = () => {
    setKeys({
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
