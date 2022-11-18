import React, { useState } from "react";
import "./style.scss";
import logo from "../../assets/images/logo.png";

const UserContact = ({ contacts, changeChat }) => {
  const [isActive, setIsActive] = useState(0);
  const handleChangeActive = (index, item) => {
    setIsActive(index);
    changeChat(item);
  };

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
            <div className="user-contact__item__avatar">
              <img src={logo} alt="" />
            </div>
            <div className="user-contact__item__info">
              <div className="contact-username">{item.username}</div>
              <p className="contact-message">
                {index} 
                Helloodasasdasd sdasdasdasdasasdasooo Hellooooo Hellooooo ssss
              </p>
            </div>
            <div className="user-contact__item__time">12:53</div>
          </div>
        );
      })}
    </div>
  );
};

export default UserContact;
