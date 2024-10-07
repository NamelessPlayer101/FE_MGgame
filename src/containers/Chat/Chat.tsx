import React from "react";
import style from "./Chat.module.scss";
import { socket } from "../../services/socket";

function Chat() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    socket.on("connection", (socket) => {});

    socket.on("chat", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("connection");
      socket.off("chat");
    };
  }, []);

  React.useEffect(() => {
    const message = document.querySelector(`.${style.message}`);
    const content = document.querySelector(`.${style.content}`);
    if (message && content) {
      const isAtBottom =
        content.scrollHeight - content.scrollTop === content.clientHeight;
      if (messages.length > 0 && !isAtBottom) {
        content.scrollTop = content.scrollHeight;
      }
    }
  }, [messages]);

  const onSubmit = () => {
    socket.emit("chat", message);
  };

  return (
    <div className={style.container}>
      <div
        onClick={() => {
          console.log(JSON.stringify(messages));
        }}
        className={style.header}
      >
        Chat
      </div>
      <div className={style.content}>
        {messages.map((message, index) => (
          <div key={index} className={style.message}>
            {message}
          </div>
        ))}
      </div>
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
