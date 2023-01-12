import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer";
import logo from "../../assets/images/brand.png";
import { FaVideo, FaPhone } from "react-icons/fa";
import "./style.scss";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "../ChatInput/ChatInput";
var moment = require("moment");
const cloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;

const ChatContainer = ({
  lastMsgRef,
  onlineUser,
  currentChat,
  messages,
  handleSendMessage,
  handleSendImage,
}) => {
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
            <div className="chat-header__info__user__username">
              {currentChat?.user?.username}
            </div>
            <p className="chat-header__info__user__status">
              {onlineUser.some((u) => u.userId === currentChat.user?._id) ? (
                <span className="online">Online</span>
              ) : (
                <span className="offline">Offline</span>
              )}
            </p>
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
                item?.sender === currentChat.user?._id ? "receive" : "send"
              }`}
            >
              {item?.message?.image && !item?.message?.text ? (
                <div className="content">
                  <img src={`${cloudinaryURL}${item?.message?.image}`} alt="" />
                  <span className="tooltip">
                    {moment(item?.createdAt).format("ddd HH:mm")}
                  </span>
                </div>
              ) : (
                ""
              )}
              {!item?.message?.image && item?.message?.text ? (
                <div className="content">
                  {item?.message?.text}
                  <span className="tooltip">
                    {moment(item?.createdAt).format("ddd HH:mm")}
                  </span>
                </div>
              ) : (
                ""
              )}
              {item?.message?.image && item?.message?.text ? (
                <div className="content">
                  <img src={`${cloudinaryURL}${item?.message?.image}`} alt="" />
                  {item?.message?.text}
                  <span className="tooltip">
                    {moment(item?.createdAt).format("ddd HH:mm")}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <ChatInput
        handleSendMessage={handleSendMessage}
        handleSendImage={handleSendImage}
      />
    </div>
  );
};

export default ChatContainer;
