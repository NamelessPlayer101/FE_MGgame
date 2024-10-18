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
    setIsShowInput(true);

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
    console.log(e.code);
  };

  const handleKeyUp = (e: any) => {
    // console.log(e.code);
  };

  const handleVisibilityChange = () => {
    console.log("Sự kiện chuyển tab trong trình duyệt");
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };

  const handleWindowBlur = () => {
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
        <div
          onClick={() => {
            // console.log(JSON.stringify(keys));
          }}
        >
          Name player
        </div>
        <input type="text" className="name-player-input" name="playerName" />
        <button type="submit" className="button btn-primary">
          Game on!
        </button>
      </div>
    </form>
  );
}

export default Game;
