import React, { useState, useEffect } from "react";
import axios from "axios";
import DriverNav from "../../components/driver/DriverNav";
import { useStateContext } from "../../context/ContextProvider";
import profilePic from "../../assets/Images/profilepic.webp";
import LogoutButton from "../../components/common/LogoutButton";
import "../../assets/styles/Driver.css";

function DriverProfile() {
  const [userData, setUserData] = useState(null);
  const [defaultRide, setDefaultRide] = useState(null);
  const { email } = useStateContext();

  useEffect(() => {
    // Fetch user data from the server using Axios
    axios
      .get(`http://localhost:8080/driver/profiledata?email=${email}`)
      .then((response) => {
        // Set the userData state with the response data
        setUserData(response.data.currentUser); // Changed object1 to currentUser
        setDefaultRide(response.data.driverDefaultRide);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [email]); // Make sure to include email as a dependency for useEffect

  return (
    <>
      <div className="Driver-profile-container">
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
        <div className="data-wapper">
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
          <div className="default-ride-data">
            {defaultRide ? (
              <div>
                <h2>Default Ride</h2>
                <p>From: {defaultRide.from}</p>
                <p>To: {defaultRide.to}</p>
                <p>Available Seats: {defaultRide.seats}</p>
                <p>Date and Time: {defaultRide.date + defaultRide.time}</p>
                <p>
                  Days of Week:{" "}
                  {defaultRide.daysOfWeek.map((day, index) => (
                    <React.Fragment key={index}>
                      {day}
                      {index < defaultRide.daysOfWeek.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
        <DriverNav />
      </div>
    </>
  );
}

export default DriverProfile;
