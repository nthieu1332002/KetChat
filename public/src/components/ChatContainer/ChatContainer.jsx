import React, { useState, useEffect, useRef } from "react";
import ImageContainer from "../ImageContainer/ImageContainer";
import logo from "../../assets/images/brand.png";
import { FaVideo, FaPhone } from "react-icons/fa";
import "./style.scss";
import messageAPI from "../../config/api/chat/messageAPI";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "../ChatInput/ChatInput";
import { toast } from "react-toastify";
const { getMessageAPI, addMessageAPI } = messageAPI;

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const lastMsgRef = useRef();
  
  const userId = Cookies.get("userId");

  useEffect(() => {
    const getMessages = async () => {
      await getMessageAPI({
        from: userId,
        to: currentChat._id,
      }).then((res) => {
        setMessages(res);
      }).catch((err) => {
        console.log(err)
      });
    };
    getMessages();
  }, [currentChat, userId]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        if (currentChat._id === data.from) {
          setArrivalMessage({ fromSelf: false, message: data.msg });
        }
      });
    }
  }, [currentChat, socket]);

  useEffect(() => {
    arrivalMessage && (setMessages((prev) => [...prev, arrivalMessage]));
  }, [arrivalMessage]);

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: userId,
      msg,
    });

    await addMessageAPI({
      from: userId,
      to: currentChat._id,
      message: msg,
    })
      .then(() => {
        const newMsg = [...messages];
        newMsg.push({ fromSelf: true, message: msg });
        setMessages(newMsg);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response.data.error.message);
      });
  };

  return (
    <div className="chat-main">
      <div className="chat-header">
        <div className="chat-header__info">
          <ImageContainer
            avt={logo}
            className={"chat-header__info__avatar"}
            size={50}
          />
          <div className="chat-header__info__user">
            <div className="chat-header__info__user__username">Hieu nguyen</div>
            <p className="chat-header__info__user__status">14 min ago</p>
          </div>
        </div>
        <div className="chat-header__action">
          <div className="chat-header__action__item">
            <FaVideo />
          </div>
          <div className="chat-header__action__item">
            <FaPhone />
          </div>
        </div>
      </div>
      <div className="chat-body">
        {messages?.map((item) => {
          return (
            <div
              ref={lastMsgRef}
              key={uuidv4()}
              className={`message ${
                item?.fromSelf === false ? "receive" : "send"
              }`}
            >
              <div className="content">
                <p>{item.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
