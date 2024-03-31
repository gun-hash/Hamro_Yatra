import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PassengerConfirmation() {
  const location = useLocation();
  const { from, to, date, time, seats } = location.state; // Passed from the previous page

  useEffect(() => {
    // Ensure GalliMapPlugin is defined (GalliMaps script should be loaded in index.html)
    if (window.GalliMapPlugin) {
      const galliMapsObject = {
        accessToken: "YOUR_ACCESS_TOKEN", // Replace with your GalliMaps access token
        map: {
          container: "map", // ID of the div where the map will render
          center: [(from.lat + to.lat) / 2, (from.lng + to.lng) / 2], // Center map between from and to locations
          zoom: 12,
        },
        // Add more GalliMaps options if needed
      };

      // Initialize GalliMap
      new window.GalliMapPlugin(galliMapsObject);

      // Assuming you have latitude and longitude for from and to locations
      // Add markers for from and to locations on the map here if needed
    }
  }, [from, to]); // Depend on from and to so map updates if they change

  const handleConfirmation = async () => {
    const postData = { from, to, date, time, seats };
    // Implement the POST request using fetch or Axios here
    console.log(postData); // For testing purposes, remove or replace with actual post request
  };

  return (
    <div className="passenger-main-container">
      <div id="map" style={{ height: "400px" }}></div>
      <div className="ride-details">
        <p>From: {from.name}</p>
        <p>To: {to.name}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Seats: {seats}</p>
      </div>
      <button onClick={handleConfirmation} className="confirm-button">
        Confirm Ride
      </button>
    </div>
  );
}
