import React, { useEffect, useState, useRef } from "react";
import { FaImages, FaRegSmile, FaTimes } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./style.scss";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const ChatInput = ({ handleSendMessage, handleSendImage }) => {
  const [msg, setMsg] = useState("");
  const [isEmoji, setIsEmoji] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const { msgStatus } = useSelector((state) => state.messenger);

  let emojiRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    let message = msg;
    message += emoji.native;
    setMsg(message);
  };

  useEffect(() => {
    const handler = (e) => {
      if (emojiRef.current) {
        if (!emojiRef.current.contains(e.target)) {
          setIsEmoji(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (!selectedImage) {
      setPreviewImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  useEffect(() => {
    if (msgStatus === "success") {
      setSelectedImage()
    }
  }, [msgStatus]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (msg.length > 0 && !selectedImage) {
      handleSendMessage(msg);
      setMsg("");
    }
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        handleSendImage(msg, reader.result);
        setMsg("");
      };
      reader.onerror = () => {
        setSelectedImage()
        console.error("something went wrong!");
      };
    }
  };

  return (
    <>
      <form className="chat-input" onSubmit={(e) => sendMessage(e)}>
        {previewImage && (
          <div className="preview-img-container">
            {msgStatus === "loading" ? <Loading /> : ""}
            <img src={previewImage} alt={previewImage} />
            <div className="remove-img" onClick={() => setSelectedImage()}>
              <FaTimes className="remove-img__icon" size={10} />
            </div>
          </div>
        )}
        <label htmlFor="send-img" className="chat-input__choose-image">
          <FaImages className="image-icon" />
          <input
            id="send-img"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            type="file"
            accept="image/*"
          />
        </label>
        <div className="chat-input__text">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="Aa"
          />
          <div className="chat-input__text__emoji">
            <FaRegSmile
              className="emoji"
              onClick={() => setIsEmoji(!isEmoji)}
            />
            {isEmoji && (
              <div className="emoji-picker" ref={emojiRef}>
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  searchPosition="none"
                  previewPosition="none"
                />
              </div>
            )}
          </div>
        </div>
        <button className="chat-input__send" type="submit">
          <IoMdSend />
        </button>
      </form>
    </>
  );
};

export default ChatInput;
