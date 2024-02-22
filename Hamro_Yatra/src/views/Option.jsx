import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Images/logo.png";
import Blob1 from "../assets/Images/option-top.png";
import Blob2 from "../assets/Images/option-buttom.png";
import "../assets/styles/option.css";

export default function Option() {
  return (
    <div className="option-container-main">
      <div className="blob-top">
        <img src={Blob1} alt="top" />
      </div>
      <div className="option-center">
        <img src={Logo} alt="logo" className="option-logo" />
        <Link to="register" className="option-button signup">Sign up</Link>
        <Link to="login" className="option-button login">Login</Link>
      </div>
      <div className="blob-bottom">
        <img src={Blob2} alt="bottom" />
      </div>
    </div>
  );
}
