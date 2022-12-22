import React, { useEffect, useState, useRef } from "react";
import { FaImages, FaRegSmile, FaPaperPlane } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./style.scss";

const ChatInput = ({handleSendMessage}) => {
  const [msg, setMsg] = useState("");
  const [isEmoji, setIsEmoji] = useState(false);
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

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("hello", msg)
    if (msg.length > 0) {
      handleSendMessage(msg)
      setMsg("")
    }
  }
  
  return (
    <form className="chat-input" onSubmit={(e) => sendMessage(e)}>
      <div className="chat-input__choose-image">
        <FaImages />
      </div>
      <div className="chat-input__text">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          placeholder="Aa"
        />
        <div className="chat-input__text__emoji">
          <FaRegSmile className="emoji" onClick={() => setIsEmoji(!isEmoji)} />
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
        <IoMdSend/>
      </button>
    </form>
  );
};

export default ChatInput;
