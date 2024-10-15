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

  return <div className="game">
    Game
    <div className="name-player">
      Name player input
      <input className="name-player-input" />
      <button className="button btn-primary">Game on!</button>
    </div>
  </div>;
}

export default Game;
