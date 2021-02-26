import React from "react";
import { useParams } from "react-router-dom";

import style from "./chat.module.css";
import useChat from "./useChat";

const ChatRoom = (props) => {
  // const { roomId } = props.match.params;

  const params = useParams();
  const roomId = params.userid;

  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  return (
    <div className={style["chat-room-container"]}>
      {/* <h1 className="room-name">Room: {roomId}</h1> */}
      <div className={style["messages-container"]}>
        <ol className={style["messages-list"]}>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`${style["message-item"]} ${
                message.ownedByCurrentUser
                  ? style["my-message"]
                  : style["received-message"]
              }`}
            >
              {message.msg}
            </li>
          ))}
        </ol>
      </div>
      <div className={style.chatMBa}>
        <div>
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className={style["new-message-input-field"]}
          />
        </div>
        <div>
          <button
            onClick={handleSendMessage}
            className={style["send-message-button"]}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
