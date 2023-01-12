import React from "react";
import avt from "../../assets/images/logo.png";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import "./style.scss";
import Loading from "../Loading/Loading";
const cloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;

const ChatInfo = ({ currentChat, limit, setLimit, changeAvatar }) => {
  const { imgList, imgStatus, imgAmount } = useSelector(
    (state) => state.messenger
  );
  var imgRemain = imgAmount - imgList.length;
  const loadMoreImage = () => {
    setLimit(limit + 6);
  };

  const loadLessImage = () => {
    setLimit(2);
  };


  return (
    <div className="chat-info">
      <div className="chat-info__avatar">
        <img src={avt} alt="" />
        <div className="username">{currentChat?.user?.username}</div>
      </div>
      <div className="chat-info__media">
        <div className="chat-info__media__header">
          <h3>
            Media <span className="total-image">({imgAmount})</span>
          </h3>
          {imgList.length > 2 ? (
            <p className="view-less" onClick={loadLessImage}>
              Show less
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="chat-info__media__content">
          {imgStatus === "loading" ? (
            <Loading />
          ) : (
            imgList &&
            imgList.map((item, index) => {
              return (
                <div className="chat-info__media__content__item" key={index}>
                  <img src={`${cloudinaryURL}${item.message?.image}`} alt="" />
                </div>
              );
            })
          )}
          {imgRemain !== 0 ? (
            <div
              className="chat-info__media__content__item more"
              onClick={loadMoreImage}
            >
              <div className="image-amount">{imgRemain}+</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
