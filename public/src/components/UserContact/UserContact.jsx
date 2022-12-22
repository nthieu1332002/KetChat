import React, { useState, useEffect } from "react";
import "./style.scss";
import logo from "../../assets/images/brand.png";
import ImageContainer from "../ImageContainer/ImageContainer";
const UserContact = ({ socket, contacts, changeChat }) => {
  const [isActive, setIsActive] = useState(0);
  const [newMsg, setNewMsg] = useState([]);
  console.log("contacts", contacts);
  console.log("newMsg", newMsg);
  const handleChangeActive = (index, item) => {
    setIsActive(index);
    changeChat(item);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        console.log("datadddd", data);
        setNewMsg(data);
      });
    }
  }, [socket.current]);


  return (
    <div className="user-contact">
      <h4>All Messages</h4>
      {contacts.map((item, index) => {
        return (
          <div
            className={`user-contact__item ${
              index === isActive ? "active" : ""
            }`}
            key={item._id}
            onClick={() => handleChangeActive(index, item)}
          >
            <ImageContainer
              avt={logo}
              className={"user-contact__item__avatar"}
              size={50}
            />

            <div className="user-contact__item__info">
              <div className="contact-username">{item.username}</div>
              {newMsg?.from === item._id ? (
                <p className="contact-message">
                  {newMsg.from}: {newMsg.msg}
                </p>
              ) : (
                <p className="contact-message">
                  {item.fromSelf ? `You` : item.username}: {item.lastMsg}
                </p>
              )}
            </div>
            <div className="user-contact__item__time">12:53</div>
          </div>
        );
      })}
    </div>
  );
};

export default UserContact;
