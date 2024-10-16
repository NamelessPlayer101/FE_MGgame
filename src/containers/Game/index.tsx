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
      Game
      <div className="name-player" hidden={true}>
        Name player input
        <input
          required
          type="text"
          className="name-player-input"
          name="playerName"
          pattern="^[a-zA-Z]+$"
          onInvalid={(e) =>
            e.currentTarget.setCustomValidity('Chỉ bao gồm chữ cái')
          }
          onInput={(e) => e.currentTarget.setCustomValidity('')}
        />
        <button type="submit" className="button btn-primary">
          Game on!
        </button>
      </div>
    </form>
  );
}

export default Game;
