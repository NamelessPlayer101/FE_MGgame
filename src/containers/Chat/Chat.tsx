import React from "react";
import style from "./Chat.module.scss";

function Chat() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <ul id="messages"></ul>
        <form id="form" action="">
          <input id="input" autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

