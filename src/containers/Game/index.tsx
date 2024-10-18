import React, { useEffect } from "react";
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

  React.useEffect(() => {
    socket.connect();
    socket.on("game", (data) => {
      console.log(data);
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      socket.off("game");
      socket.disconnect();
    };
  }, []);

  const onSubmit = (event: any) => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    event.preventDefault();
    setIsShowInput(false);
  };

  const handleKeyDown = (e: any) => {
    if ((e.code in keys)) {
      setKeys((prev: IKeys) => {
        const newKeys = { ...prev };
        newKeys[e.code as keyof IKeys].pressed = true;
        return newKeys;
      });
    };
  };

  const handleKeyUp = (e: any) => {
    if ((e.code in keys)) {
      setKeys((prev: IKeys) => {
        const newKeys = { ...prev };
        newKeys[e.code as keyof IKeys].pressed = false;
        return newKeys;
      });
    };
  };

  useEffect(() => {
    console.log(JSON.stringify(keys));
  }, [keys]);

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
    console.log("Cửa sổ trình duyệt blur (Chuyển sang tab khác)");
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };

  const handleWindowFocus = () => {
    console.log("Cửa sổ trình duyệt focus (Quay lại tab hiện tại)");
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  };

  return (
    <form onSubmit={onSubmit} className="game">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            radius={15}
            fill="white"
            shadowBlur={20}
          />
        </Layer>
      </Stage>
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
