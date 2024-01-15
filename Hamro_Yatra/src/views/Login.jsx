import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      const { token, role } = response.data;

      localStorage.setItem("jwtToken", token);

      if (role == "driver") {
        navigate("/driver");
      } else if (role == "passenger") {
        navigate("/passenger");
      } else if (role == "admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error logging in:", error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
