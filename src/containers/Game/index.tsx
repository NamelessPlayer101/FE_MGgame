import React from "react";
import { socket } from "../../services/socket";

function Game() {
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
    console.log('test');
  };

  return (
    <form onSubmit={onSubmit} className="game">
      Game
      <div className="name-player">
        Name player input
        <input required className="name-player-input" name="playerName" />
        <button type="submit" className="button btn-primary" >Game on!</button>
      </div>
    </form>
  );
}

export default Game;
