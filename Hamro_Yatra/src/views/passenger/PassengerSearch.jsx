import React, { useState } from "react";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import "../../assets/styles/passenger.css";
import Passenger_nav from "../../components/passenger/passenger_nav";

export default function PassengerSearch() {
  const { email } = useStateContext();
  console.log(email);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });

  const [seatsNeeded, setSeatsNeeded] = useState(1);

  const incrementSeats = () => {
    if (seatsNeeded < 3) {
      setSeatsNeeded((prevSeats) => prevSeats + 1);
    }
  };

  const decrementSeats = () => {
    if (seatsNeeded > 1) {
      setSeatsNeeded((prevSeats) => prevSeats - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/passenger/search?email=${email}`, {
        seats: seatsNeeded,
        ...formData,
      });
      if (response.status === 200) {
        window.location.replace('/passenger/ride-history'); // Redirect to rides history page
      } else {
        console.error("Error saving ride");
        // Handle other status codes if needed
      }
    } catch (error) {
      console.error("Error searching for ride:", error.message);
    }
  };

  return (
    <>
      <div className="passenger-main-container">
        <div className="find-ride-container">
          <h3>Find a ride</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="fromInput">From:</label>
              <input
                type="text"
                id="fromInput"
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder="Enter your starting location"
              />
            </div>
            <div className="input-group">
              <label htmlFor="toInput">To:</label>
              <input
                type="text"
                id="toInput"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="Enter your destination"
              />
            </div>
            <div className="input-group">
              <label htmlFor="dateInput">When:</label>
              <input
                type="date"
                id="dateInput"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Seats needed:</label>
              <div className="seat-counter">
                <button type="button" onClick={decrementSeats}>-</button>
                <span>{seatsNeeded}</span>
                <button type="button" onClick={incrementSeats}>+</button>
              </div>
            </div>
            <div className="btn-group">
              <button type="submit" className="btn-search">Search</button>
            </div>
          </form>
        </div>
        <Passenger_nav />
      </div>
    </>
  );
}
