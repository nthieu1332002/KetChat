import React from "react";
import { FaCircle } from "react-icons/fa";
import "./style.scss";

const ImageContainer = ({ avt, className, size, isOnline }) => {
  console.log("avt", avt)
  return (
    <div className={`img-outer-container ` + className}>
      {isOnline ? (
        <div className="online-icon">
          <FaCircle size={10} />
        </div>
      ) : (
        ""
      )}

      <img style={{ height: size, width: size }} src={avt} alt={className} />
    </div>
  );
};

export default ImageContainer;
