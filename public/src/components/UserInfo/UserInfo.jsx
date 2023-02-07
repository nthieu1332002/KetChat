import React from "react";
import avt from "../../assets/images/brand.png";
import { MdSettings } from "react-icons/md";
import "./style.scss";

const UserInfo = ({ username, avatar, isOpenSetting, setIsOpenSetting }) => {

  return (
    <div className="user-info">
      <div className="user-info__avatar">
        <img src={avatar === "" ? avt : avatar} alt="" />
      </div>
      <div className="user-info__username">
        <h3>{username}</h3>
      </div>
      <div className="user-info__setting">
        <MdSettings
          size={25}
          onClick={() => setIsOpenSetting(!isOpenSetting)}
        />
      </div>
    </div>
  );
};

export default UserInfo;
