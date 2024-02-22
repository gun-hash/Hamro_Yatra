import React, { useState } from "react";
import "../assets/styles/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Images/logo.png";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
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
        "http://localhost:8080/api/register",
        formData
      );
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.response.data);
    }
  };

  return (
    <div className="Register-main-container">
      <div className="logo-register">
        <img src={Logo} alt="logo" />
      </div>
      <p>Register</p>
      <form onSubmit={handleSubmit} className="form-section">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your Full Name"
        />

        <br />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your PhoneNumber"
        />

        <br />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />

        <br />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create your Password"
        />

        <br />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="" disabled>
            Select Role
          </option>
          <option value="driver">Driver</option>
          <option value="passenger">Passenger</option>
        </select>

        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
