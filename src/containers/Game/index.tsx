import React from "react";
import { socket } from "../../services/socket";
import { Stage, Layer, Circle } from "react-konva";

interface IKeys {
  w: {
    pressed: boolean;
  };
  a: {
    pressed: boolean;
  };
  s: {
    pressed: boolean;
  };
  d: {
    pressed: boolean;
  };
}

function Game() {
  const [isShowInput, setIsShowInput] = React.useState(true);
  const [keys, setKeys] = React.useState<IKeys>({
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
  });

  const handleKeyDown = (e: any) => {
    switch (e.code) {
      case "KeyW":
        setKeys((prev: IKeys) => {
          const newKeys = { ...prev, w: { pressed: true } };
          return newKeys;
        });
        break;
      case "KeyA":
        setKeys((prev: IKeys) => {
          const newKeys = { ...prev, a: { pressed: true } };
          return newKeys;
        });
        break;
      case "KeyS":
        setKeys((prev: IKeys) => {
          const newKeys = { ...prev, s: { pressed: true } };
          return newKeys;
        });
        break;
      case "KeyD":
        setKeys((prev: IKeys) => {
          const newKeys = { ...prev, d: { pressed: true } };
          return newKeys;
        })
        break;
    }
  };

  const handleKeyUp = (e: any) => {
    switch (e.code) {
      case "KeyW":
        setKeys((prev: IKeys) => {
          const newKeys = { ...prev, w: { pressed: false } };
          return newKeys;
        });
        break;
      case "KeyA":
        setKeys((prev: IKeys) => {
          const newKeys = { ...prev, a: { pressed: false } };
          return newKeys;
        });
        break;
      case "KeyS":
        setKeys((prev: IKeys) => {
          const newKeys = { ...prev, s: { pressed: false } };
          return newKeys;
        });
        break;
      case "KeyD":
        setKeys((prev: IKeys) => {
          const newKeys = { ...prev, d: { pressed: false } };
          return newKeys;
        })
        break;
    }
  };

  React.useEffect(() => {
    socket.connect();

    socket.on("game", (data) => {
      console.log(data);
    });

    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Thực hiện các hành động khi tab bị ẩn (giống như pause)
        setKeys({
          w: {
            pressed: false,
          },
          a: {
            pressed: false,
          },
          s: {
            pressed: false,
          },
          d: {
            pressed: false,
          },
        })
      } else {
        // Thực hiện các hành động khi tab quay lại (giống như resume)
        console.log("Tab được hiển thị (resume)");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      socket.off("game");
      socket.disconnect();
    };
  }, []);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsShowInput(false);
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
        <div onClick={() => {
          console.log(keys);
        }}>Name player input</div>
        <input type="text" className="name-player-input" name="playerName" />
        <button type="submit" className="button btn-primary">
          Game on!
        </button>
      </div>
    </form>
  );
}

export default Game;
