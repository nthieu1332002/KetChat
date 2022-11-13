import React from "react";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowInLeft } from "react-icons/bs";
import "./style.scss";

const TurnBack = () => {
  const navigate = useNavigate();
  return <BsBoxArrowInLeft className="turn-back" size={20} onClick={() => navigate("/")}/>;
};

export default TurnBack;
