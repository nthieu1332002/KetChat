import React from "react";
import "./style.scss";

const CustomInput = ({ id, register, type, placeholder }) => {
  return (
    <>
      <input id={id} type={type} placeholder={placeholder} {...register(id)} />
    </>
  );
};

export default CustomInput;
