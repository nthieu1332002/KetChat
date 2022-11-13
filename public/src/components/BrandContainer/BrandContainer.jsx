import React from "react";
import brand from "../../assets/images/brand.png"
import "./style.scss"
const BrandContainer = () => {
  return (
    <div className="brand-container">
      <img src={brand} alt="brand" />
    </div>
  );
};

export default BrandContainer;