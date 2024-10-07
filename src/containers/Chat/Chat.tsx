import React from "react";
import style from "./Chat.module.scss";

function Chat() {
  const [message, setMessage] = React.useState("");

  const onSubmit = () => {
    console.log(message);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>Chat</div>
      <div className={style.content}></div>
      <div className={style.footer}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message) {
              setMessage("");
              onSubmit();
            }
          }}
          className={style.input}
          type="text"
        />
        <div onClick={message ? onSubmit : () => {}} className={style.button}>
          Send
        </div>
      </div>
    </div>
  );
}

export default Chat;
