import React from "react";
import "./style.scss";

const CustomToggle = () => {
  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider round"></span>
    </label>
  );
};

export default CustomToggle;
