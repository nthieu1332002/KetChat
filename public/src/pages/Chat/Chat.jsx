import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BrandContainer from "../../components/BrandContainer/BrandContainer";
import avt from "../../assets/images/brand.png";
import { BsBoxArrowInLeft } from "react-icons/bs";
import UserContact from "../../components/UserContact/UserContact";
import userAPI from "../../config/api/user/userAPI";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import { io } from "socket.io-client";
import "./style.scss";
import ImageContainer from "../../components/ImageContainer/ImageContainer";

const { getAllUserAPI } = userAPI;

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const userId = Cookies.get("userId");
  const username = Cookies.get("username");
  console.log("contacts", contacts);

  useEffect(() => {
    const getAllUser = async () => {
      await getAllUserAPI({ id: userId })
        .then((res) => {
          console.log("res contact", res);
          setContacts(res.user);
          socket.current = io(process.env.REACT_APP_API);
          socket.current.emit("add-user", userId);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response.data.error.message);
        });
    };
    getAllUser();
  }, [userId]);

  useEffect(() => {
    if (contacts.length > 0) {
      setCurrentChat(contacts[0]);
    }
  }, [contacts]);



  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    navigate("/");
    toast.success("You have logged out.");
  };

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat-page">
      <div className="chat-page_container">
        <div className="side-bar">
          <div className="logo-wrapper">
            <BrandContainer />
          </div>

          <UserContact socket={socket} contacts={contacts} changeChat={handleChangeChat} />

          <div className="user-info">
            <ImageContainer avt={avt} className={"avatar-account"} size={50} />
            <div className="username-account">
              <h3>{username}</h3>
            </div>
            <div className="logout-button">
              <BsBoxArrowInLeft
                className="icon"
                onClick={handleLogout}
                size={20}
              />
            </div>
          </div>
        </div>
        <ChatContainer currentChat={currentChat} socket={socket} />
        <div className="chat-info">
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
