import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import brand from "../../assets/images/brand.png";
import logo from "../../assets/images/logo.png";

import UserContact from "../../components/UserContact/UserContact";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import { io } from "socket.io-client";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  seenMessage,
  updateLastMessageContact,
} from "../../store/contactSlice";
import {
  getArrivalMessage,
  getImage,
  getMessages,
  sendImage,
  sendMessage,
} from "../../store/messengerSlice";
import Loading from "../../components/Loading/Loading";
import useSound from "use-sound";
import sendSound from "../../assets/audio/sendMessageSound.mp3";
import newMsgSound from "../../assets/audio/newMessageSound.mp3";
import messageAPI from "../../config/api/chat/messageAPI";
import ChatInfo from "../../components/ChatInfo/ChatInfo";
import SideBar from "../../components/SideBar/SideBar";
import UserInfo from "../../components/UserInfo/UserInfo";
import SettingModal from "../../components/SettingModal/SettingModal";
const { seenMessageAPI } = messageAPI;

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const lastMsgRef = useRef();
  const navigate = useNavigate();
  const { contacts, status } = useSelector((state) => state.contacts);
  const { messages } = useSelector((state) => state.messenger);
  const { avatar } = useSelector((state) => state.user);

  const [currentChat, setCurrentChat] = useState("");
  const userId = Cookies.get("userId");
  const username = Cookies.get("username");
  const [sendPlay] = useSound(sendSound);
  const [newMsgPlay] = useSound(newMsgSound);
  const [onlineUser, setOnlineUser] = useState([]);
  const [limit, setLimit] = useState(2);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  console.log(isOpenSetting);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API);
  }, []);

  useEffect(() => {
    socket.current.emit("add-user", userId);
  }, [userId]);

  useEffect(() => {
    socket.current.on("getUser", (data) => {
      const users = data.filter((user) => user.userId !== userId);
      setOnlineUser(users);
    });
  }, [userId]);

  useEffect(() => {
    dispatch(getAllUser({ id: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (contacts && contacts.length > 0 && Object(currentChat).length === 0) {
      setCurrentChat(contacts[0]);
    }
  }, [contacts, currentChat]);

  useEffect(() => {
    dispatch(
      getMessages({
        from: userId,
        to: currentChat.user?._id,
      })
    );
  }, [currentChat, dispatch, userId]);

  useEffect(() => {
    dispatch(
      getImage({
        from: userId,
        to: currentChat.user?._id,
        limit: limit,
      })
    );
  }, [currentChat, dispatch, limit, userId]);

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView();
  }, [currentChat, dispatch, messages]);

  useEffect(() => {
    const updateMsgStatus = async () => {
      if (messages.length > 0) {
        const lastMsg = messages[messages.length - 1];
        if (
          currentChat.user?._id === lastMsg.sender &&
          currentChat.msgInfo?.status !== "seen"
        ) {
          await seenMessageAPI({ _id: lastMsg._id })
            .then((res) => {
              if (res.status === true) {
                socket.current.emit("seen-msg", lastMsg.sender);
                dispatch(seenMessage(lastMsg.sender));
              }
            })
            .catch((err) => {
              console.log("error", err);
            });
        }
      }
    };
    updateMsgStatus();
  }, [currentChat, dispatch, messages]);

  // useEffect(() => {
  //   const eventListener = (data) => {
  //     console.log("seen msg receive", data);
  //     dispatch(seenMessage(data));
  //   };
  //   socket.current.on("seen-msg-receive", eventListener);

  //   return () => socket.current.off("seen-msg-receive", eventListener);
  // }, [dispatch]);

  useEffect(() => {
    const eventListener = (data) => {
      console.log("msg receive in", data);
      newMsgPlay();
      if (currentChat.user?._id === data.sender) {
        dispatch(getArrivalMessage(data));
      }
      dispatch(updateLastMessageContact(data));
    };
    socket.current.on("msg-receive", eventListener);
    console.log("msg receive out");
    return () => socket.current.off("msg-receive", eventListener);
  }, [currentChat, dispatch, newMsgPlay]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    socket.current.emit("logout", userId);
    navigate("/");
    toast.success("You have logged out.");
  };

  const handleSendMessage = async (msg) => {
    console.log("send msg", msg);
    sendPlay();
    dispatch(
      sendMessage({
        from: userId,
        to: currentChat.user?._id,
        message: msg,
      })
    )
      .then((res) => {
        console.log("send msg res");
        socket.current.emit("send-msg", res.payload);
        dispatch(updateLastMessageContact(res.payload));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSendImage = async (msg, img) => {
    sendPlay();
    dispatch(
      sendImage({
        from: userId,
        to: currentChat.user?._id,
        msg: msg,
        img: img,
      })
    )
      .then((res) => {
        setTimeout(() => {
          socket.current.emit("send-msg", res.payload);
        }, 2000);
        dispatch(updateLastMessageContact(res.payload));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="chat-page">
      <SideBar handleLogout={handleLogout} />
      <div className="chat-page__container">
        <div className="side-bar">
          <picture className="side-bar__brand">
            <source media="(max-width:1024px)" srcSet={logo} />
            <img src={brand} alt="brand" />
          </picture>
          <div className="user-contact">
            <h4>All Messages</h4>
            <div className="user-contact__list">
              {status === "loading" ? (
                <Loading />
              ) : contacts && contacts.length > 0 ? (
                contacts.map((item) => {
                  return (
                    <div
                      className={`user-contact__item ${
                        currentChat.user?._id === item.user._id ? "active" : ""
                      }`}
                      key={item.user._id}
                      onClick={() => setCurrentChat(item)}
                    >
                      <UserContact
                        item={item}
                        isOnline={onlineUser.some((u) =>
                          u.userId === item.user._id ? true : false
                        )}
                      />
                    </div>
                  );
                })
              ) : (
                "You have no friend."
              )}
            </div>
          </div>

          <UserInfo
            username={username}
            avatar={avatar}
            isOpenSetting={isOpenSetting}
            setIsOpenSetting={setIsOpenSetting}
          />
        </div>
        <ChatContainer
          lastMsgRef={lastMsgRef}
          onlineUser={onlineUser}
          currentChat={currentChat}
          messages={messages}
          handleSendMessage={handleSendMessage}
          handleSendImage={handleSendImage}
        />
        <ChatInfo
          currentChat={currentChat}
          userId={userId}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
      <SettingModal
        userId={userId}
        avatar={avatar ? avatar : logo}
        isOpenSetting={isOpenSetting}
        setIsOpenSetting={setIsOpenSetting}
      />
    </div>
  );
};

export default Chat;
