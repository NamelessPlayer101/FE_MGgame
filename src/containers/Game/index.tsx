import React from "react";
import { socket } from "../../services/socket";

function Game() {
  const [isShowInput, setIsShowInput] = React.useState(true);

  React.useEffect(() => {
    socket.connect();

    socket.on("game", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("game");
      socket.disconnect();
    };
  }, []);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsShowInput(false);
    console.log(isShowInput);
  };

  return (
    <form onSubmit={onSubmit} className="game">
      <div
        onClick={() => {
          console.log(isShowInput);
          setIsShowInput((prev) => !prev);
        }}
      >
        Game
      </div>
      <div
        className="name-player"
        style={{ display: isShowInput ? "flex" : "none" }}
      >
        Name player input
        <input type="text" className="name-player-input" name="playerName" />
        <button type="submit" className="button btn-primary">
          Game on!
        </button>
      </div>
    </form>
  );
}

export default Game;
