import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import axios from "axios";
import "../assets/styles/login.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Images/logo.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { userRole, settingUserRole, settingEmail, settingToken } =
    useStateContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [firstLogin, setFirstLogin] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    if (userRole) {
      if (userRole === "driver") {
        navigate("/driver");
      } else if (userRole === "passenger") {
        navigate("/passenger");
      } else if (userRole === "admin") {
        navigate("/admin");
      }
    }
  }, [userRole, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        formData
      );
      const { email, role, authtoken, firstLogin, ...rest } = response.data;
      console.log(response.data);
      // Set user role, token, and user name
      if (response.data.success) {
        settingUserRole(role);
        settingToken(authtoken);
        settingEmail(email);
        setFirstLogin(firstLogin)
      } else {
        toast.warn(response.data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-login">
        <div className="back-container">
          <Link to="/">
            <div className="arrow"></div>
          </Link>
        </div>
        <img src={Logo} alt="logo" />
      </div>

      <p style={{ fontSize: "1.2rem" }}>Enter Your email and password</p>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Your Password"
        />
        <p className="forgot">
          <Link to="/">Forgot password?</Link>
        </p>
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
