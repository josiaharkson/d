import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import dotenv from 'dotenv';
import { getUserId } from '../../Services/AuthToken';

dotenv.config();

const NEW_CHAT_MESSAGE_EVENT = process.env.REACT_APP_NEW_CHAT_MESSAGE_EVENT;
const PRIVATE_MESSAGE_EVENT = process.env.REACT_APP_PRIVATE_MESSAGE_EVENT;
const JOIN_CHAT_ROOM = process.env.REACT_APP_JOIN_CHAT_ROOM;
const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;
const OFFLINE = process.env.REACT_APP_OFFLINE;

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const userId = getUserId()

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
      transport: ["websocket"],
    });

    socketRef.current.on(PRIVATE_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === userId,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(OFFLINE, (data) => {
      const incomingMessage = {
        msg: data.message,
        ownedByCurrentUser: false,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.emit(JOIN_CHAT_ROOM, {
      userId,
      to: roomId,
      senderId: userId,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userId]);

  const sendMessage = (messageBody) => {
    const incomingMessage = {
      msg: messageBody,
      ownedByCurrentUser: true,
    };

    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      to: roomId,
      msg: messageBody,
      senderId: userId,
    });
    setMessages((messages) => [...messages, incomingMessage]);
  };

  return { messages, sendMessage };
};

export default useChat;
