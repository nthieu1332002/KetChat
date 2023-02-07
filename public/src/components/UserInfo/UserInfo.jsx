import React, { useState } from "react";
import avt from "../../assets/images/brand.png";
import { MdSettings } from "react-icons/md";
import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAvatar } from "../../store/userSlice";

const UserInfo = ({ username, avatar, isOpenSetting, setIsOpenSetting }) => {
  // const dispatch = useDispatch;
  // const [selectedAvatar, setSelectedAvatar] = useState();
  // // const [readyAvatar, setReadyAvatar] = useState();
  // console.log("setSelectedAvatar", selectedAvatar);

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
