import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <BounceLoader className="loading" color="#591e4a" />
    </div>
  );
};

export default Loading;
