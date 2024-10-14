import React from "react";
import { socket } from "../../services/socket";

interface IMessage {
  id: string;
  message: string;
}

function Chat() {
  const [isConnected, setIsConnected] = React.useState(socket.connected);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  React.useEffect(() => {
    socket.on("chat", (data) => {
      const temp = JSON.parse(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: temp.id,
          message: temp.message,
        },
      ]);
    });

    socket.connect();

    return () => {
      socket.off("chat");
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const message = document.querySelector(`.message`);
    const content = document.querySelector(`.content`);
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
    <div className={'chat'}>
      <div
        onClick={() => {
          console.log(socket.id);
        }}
        className={'header'}
      >
        Chat
      </div>
      <div className={'content'}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={'message'}
            style={
              message.id === socket.id
                ? {
                    alignSelf: "end",
                    backgroundColor: "#08C2FF",
                    color: "white",
                  }
                : {}
            }
          >
            {message.id === socket.id
              ? `${message.message}`
              : `${message.id ?? "unknown"}: ${message.message}`}
          </div>
        ))}
      </div>
      <div className={'footer'}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message) {
              setMessage("");
              onSubmit();
            }
          }}
          className={'input'}
          type="text"
        />
        <button
          onClick={message ? onSubmit : () => {}}
          className={'button'}
          style={{marginRight: "16px"}}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
