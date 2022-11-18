import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BrandContainer from "../../components/BrandContainer/BrandContainer";
import avt from "../../assets/images/logo.png";
import { BsBoxArrowInLeft } from "react-icons/bs";
import "./style.scss";
import UserContact from "../../components/UserContact/UserContact";
import userAPI from "../../config/api/user/userAPI";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
const { getAllUserAPI } = userAPI;

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const userId = Cookies.get("userId");
  console.log("currentChat", currentChat);
  useEffect(() => {
    const getAllUser = async () => {
      await getAllUserAPI({ id: userId })
        .then((res) => {
          console.log("res", res);
          setContacts(res.users);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response.data.error.message);
        });
    };
    getAllUser();
  }, [userId]);

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
          <UserContact contacts={contacts} changeChat={handleChangeChat}/>
          <div className="user-info">
            <div className="avatar-account">
              <img src={avt} alt="avt" />
            </div>
            <div className="username-account">
              <h3>nthieuHieu</h3>
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
        <div className="chat-main">
          <ChatContainer currentChat={currentChat} />
        </div>
        <div className="chat-info">
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
