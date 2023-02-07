import React, { useEffect, useState } from "react";
import "./style.scss";
import { FaExchangeAlt } from "react-icons/fa";
import { AiFillSound, AiFillEyeInvisible } from "react-icons/ai";
import CustomToggle from "../CustomToggle/CustomToggle";
import { useDispatch, useSelector } from "react-redux";
import { changeAvatar } from "../../store/userSlice";
import Loading from "../Loading/Loading";

const SettingModal = ({ userId, avatar, isOpenSetting, setIsOpenSetting }) => {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();
  const { status } = useSelector((state) => state.user);
console.log("status", status)
  console.log("previewAvatar", previewAvatar);
  useEffect(() => {
    if (!selectedAvatar) {
      setPreviewAvatar(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedAvatar);
    setPreviewAvatar(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAvatar]);

  const saveChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(selectedAvatar);
    reader.onloadend = () => {
      dispatch(changeAvatar({ userId, img: reader.result }))
      .then((res) => {
        setSelectedAvatar();
      })
      .catch((err) => {

        setSelectedAvatar();
      })
    };
    reader.onerror = () => {
      setSelectedAvatar();
      console.error("something went wrong!");
    };
    dispatch(changeAvatar({}));
  };

  return (
    <div className={`modal ${isOpenSetting === true ? "" : "close"}`}>
      <div className="modal-content">
        <div className="modal-content__item">
          <div className="avatar-setting">
            <h4>Profile Setting</h4>
            <div className="avatar-wrapper">
              <div className="avatar-container">
                {status === 'loading' ? <Loading/> : ""}
                <img src={previewAvatar ? previewAvatar : avatar} alt="" />
                <label htmlFor="change-avatar" className="change-avatar">
                  <FaExchangeAlt size={12} />
                  <input
                    id="change-avatar"
                    onChange={(e) => setSelectedAvatar(e.target.files[0])}
                    type="file"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="chat-setting">
            <h4>Chat Setting</h4>
            <div className="chat-setting__item">
              <AiFillSound className="icon" />
              <div className="chat-setting__item__title">Message sound</div>
              <CustomToggle />
            </div>
            <div className="chat-setting__item">
              <AiFillEyeInvisible className="icon" />
              <div className="chat-setting__item__title">Active status</div>
              <CustomToggle />
            </div>
          </div>
          <div className="save" onClick={saveChange}>
            <button>Save</button>
          </div>
        </div>
        <div
          className="modal-content__close"
          onClick={() => setIsOpenSetting(false)}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
