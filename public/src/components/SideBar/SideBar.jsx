import React, { useEffect, useState } from "react";
import { BsBoxArrowInLeft } from "react-icons/bs";
import moon from "../../assets/images/moon.svg"
import clouds from "../../assets/images/clouds.svg"
import {BsCircleFill, BsStars } from "react-icons/bs";
import "./style.scss";

const SideBar = ({ handleLogout }) => {
  const [theme, setTheme] = useState(true);
  console.log("theme", theme)
  useEffect(() => {
    if (!theme) {
      document.body.className="light-mode"
    } else {
      document.body.className=""
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(!theme);
  }

  return (
    <div className="chat-page__side-bar">
      <div className="chat-page__side-bar__list">
        <div className={`theme ${theme === true ? 'dark' : 'light'}`} onClick={toggleTheme}>
          <div className={`theme__wrapper light ${theme === false ? 'active' : ''}`} >
            <BsCircleFill/>
            <img src={clouds} alt=""/>
          </div>
          <div className={`theme__wrapper dark ${theme === true ? 'active' : ''}`}>
            <BsStars />
            <img src={moon} alt=""/>
          </div>
        </div>
        <div className="logout-button">
          <BsBoxArrowInLeft className="icon" onClick={handleLogout} size={20} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
