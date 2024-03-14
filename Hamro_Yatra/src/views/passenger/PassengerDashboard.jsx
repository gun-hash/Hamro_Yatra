import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import "../../assets/styles/passenger.css";
import Passenger_nav from "../../components/passenger/passenger_nav";

export default function PassengerDashboard() {
  const { email } = useStateContext();
  console.log(email);

  // State to keep track of the number of seats needed
  const [seatsNeeded, setSeatsNeeded] = useState(1);

  // Update seat count in the URL whenever it changes
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/passenger/all?email=${email}&seats=${seatsNeeded}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching passenger data:", error.message);
      });
  }, [email, seatsNeeded]);

  // Event handler to increment seat count
  const incrementSeats = () => {
    setSeatsNeeded((prevSeats) => prevSeats + 1);
  };

  // Event handler to decrement seat count
  const decrementSeats = () => {
    if (seatsNeeded > 1) {
      setSeatsNeeded((prevSeats) => prevSeats - 1);
    }
  };

  return (
    <>
      <div className="passenger-main-container">
        <div className="find-ride-container">
          <h3>Find a ride</h3>
          <div className="input-group">
            <label htmlFor="fromInput">From:</label>
            <input
              type="text"
              id="fromInput"
              placeholder="Enter your starting location"
            />
          </div>
          <div className="input-group">
            <label htmlFor="toInput">To:</label>
            <input
              type="text"
              id="toInput"
              placeholder="Enter your destination"
            />
          </div>
          <div className="input-group">
            <label htmlFor="dateInput">When:</label>
            <input type="date" id="dateInput" />
          </div>
          <div className="input-group">
            <label>Seats needed:</label>
            <div className="seat-counter">
              <button onClick={decrementSeats}>-</button>
              <span>{seatsNeeded}</span>
              <button onClick={incrementSeats}>+</button>
            </div>
          </div>
          <div className="btn-group">
            <button className="btn-search">Search</button>
          </div>
        </div>
        <Passenger_nav />
      </div>
    </>
  );
}
