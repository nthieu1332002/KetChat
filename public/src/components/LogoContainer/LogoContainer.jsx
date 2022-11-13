import React from "react";
import logo from "../../assets/images/logo.png"
import "./style.scss"
const LogoContainer = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="logo" />
    </div>
  );
};

export default LogoContainer;
