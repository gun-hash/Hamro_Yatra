import React, { useState, useEffect } from "react";
import axios from "axios";
import Passenger_nav from "../../components/passenger/passenger_nav";
import { useStateContext } from "../../context/ContextProvider";
import profilePic from "../../assets/Images/profilepic.webp";
import LogoutButton from "../../components/common/LogoutButton";
import "../../assets/styles/passenger_profile.css";
function PassengerProfile() {
  const [userData, setUserData] = useState(null);
  const { email } = useStateContext();

  useEffect(() => {
    // Fetch user data from the server using Axios
    axios
      .get(`http://localhost:8080/passenger/profiledata?email=${email}`)
      .then((response) => {
        // Set the userData state with the response data
        setUserData(response.data.currentUser); // Changed object1 to currentUser
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [email]); // Make sure to include email as a dependency for useEffect

  return (
    <>
      <div className="passenger-profile-container">
        <div className="profile-picture">
          {userData && userData.photo ? (
            <img src={userData.photo} alt="User" className="user-image" />
          ) : (
            <img
              src={profilePic}
              alt="User"
              className="user-image"
              style={{ width: "100px", height: "auto" }}
            />
          )}
        </div>
        <div className="user-data">
          {userData ? (
            <div>
              <h2>{userData.name}</h2>
              <p>ID: {userData._id}</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phone}</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
          <LogoutButton />
        </div>
        <Passenger_nav />
      </div>
    </>
  );
}

export default PassengerProfile;
