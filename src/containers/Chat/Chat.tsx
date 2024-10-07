import React from "react";
import style from "./Chat.module.scss";

function Chat() {
  return (
    <div className={style.container}>
      <div className={style.header}>Chat</div>
      <div className={style.content}></div>
      <div className={style.footer}>Bottom</div>
    </div>
  );
}

export default Chat;

