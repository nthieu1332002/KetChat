import React from "react";
import { useNavigate } from "react-router-dom";
import LogoContainer from "../../components/LogoContainer/LogoContainer";

import "./style.scss";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <div className="welcome-page__container">
        <LogoContainer />
        <div className="welcome-page__container__header">
          <h1>Welcome to KetChat!</h1>
        </div>
        <div className="welcome-page__container__navigate">
          <button className="login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="register" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
