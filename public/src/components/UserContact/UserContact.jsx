import React from "react";
import "./style.scss";
import logo from "../../assets/images/brand.png";
import ImageContainer from "../ImageContainer/ImageContainer";
import { FaCircle } from "react-icons/fa";
import { RiCheckDoubleFill } from "react-icons/ri";
import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1 m",
    ss: "%d seconds",
    m: "1 m",
    mm: "%d m",
    h: "1 h",
    hh: "%d h",
    d: "1 d",
    dd: "%d d",
    w: "1 w",
    ww: "%d w",
    M: "1 m",
    MM: "%d m",
    y: "1 y",
    yy: "%d y",
  },
});

const UserContact = ({ item, isOnline }) => {
  return (
    <>
      <ImageContainer
        avt={logo}
        className={"user-contact__item__avatar"}
        isOnline={isOnline}
        size={50}
      />

      <div className="user-contact__item__info">
        <div className="contact-username">{item.user.username}</div>
        <div className="contact-message">
          {!item.msgInfo ? (
            <p>Say hi!</p>
          ) : (
            <>
              <div
                className={`contact-message__msg ${
                  item.user._id !== item.msgInfo?.sender
                    ? ""
                    : item.msgInfo?.status === "unseen"
                    ? "unseen"
                    : ""
                }`}
              >
                {item.user._id !== item.msgInfo?.sender ? (
                  item.msgInfo?.message.image ? (
                    "You sent an image"
                  ) : (
                    <>You:  {item.msgInfo?.message.text}</>
                  )
                ) : (
                  item.msgInfo?.message.image ? (<>{item.user.username} sent a photo</>) : (<>{item.msgInfo?.message.text}</>)
                )}
              </div>
              <span className="contact-message__split">-</span>
              <span className="contact-message__time">
                {moment(item.msgInfo?.createdAt)
                  .startOf("minute")
                  .fromNow(true)}
              </span>
            </>
          )}
        </div>
      </div>
      {item.user._id === item.msgInfo?.sender &&
      item.msgInfo?.status === "unseen" ? (
        <div className="msg-status-icon">
          <FaCircle size={15} />
        </div>
      ) : (
        ""
      )}
      {item.user._id !== item.msgInfo?.sender &&
      item.msgInfo?.status === "seen" ? (
        <div className="seen-msg-status-icon">
          <RiCheckDoubleFill size={20} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserContact;
