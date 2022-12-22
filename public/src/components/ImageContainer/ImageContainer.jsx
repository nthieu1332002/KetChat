import React from "react";
import "./style.scss";

const ImageContainer = ({avt, className, size}) => {
  return (
      <img className={`img-container `+ className} style={{height: size, width: size}} src={avt} alt={className} />
  );
};

export default ImageContainer;
