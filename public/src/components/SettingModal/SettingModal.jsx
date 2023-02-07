import React from "react";
import "./style.scss";
import { FaExchangeAlt } from "react-icons/fa";

const SettingModal = ({ avatar, isOpenSetting, setIsOpenSetting }) => {
  return (
    <div className={`modal ${isOpenSetting === true ? "open" : ""}`}>
      <div className="modal-content">
        <div className="modal-content__item">
          <div className="avatar-setting">
            <h3>Profile Setting</h3>
            <div className="avatar-wrapper">
              <div className="avatar-container">
                <img src={avatar} alt="" />
                <label htmlFor="change-avatar" className="change-avatar">
                  <FaExchangeAlt />
                  <input
                    id="change-avatar"
                    //   onChange={(e) => setSelectedAvatar(e.target.files[0])}
                    type="file"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="chat-setting">
            <h3>Chat Setting</h3>
            <p>Message sounds</p>
            <p>Active status</p>
          </div>
        </div>
        <div className="modal-content__close">X</div>
      </div>
    </div>
  );
};

export default SettingModal;
