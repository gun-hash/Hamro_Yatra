import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import "../../assets/styles/passenger.css";
import Passenger_nav from "../../components/passenger/passenger_nav";

export default function PassengerSearch() {
  const { email } = useStateContext();
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState({
    from: [],
    to: [],
  });

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
  });

  const [seatsNeeded, setSeatsNeeded] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);

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
    if (name === "date") {
      // Format the date to 'YYYY-MM-DD'
      const formattedDate = value.split("T")[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (name === "from" || name === "to") {
      fetchAutocompleteSuggestions(value, name);
    }
  };

  const handleDayChange = (e) => {
    const { value } = e.target;
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const fetchAutocompleteSuggestions = async (input, type) => {
    if (input.length > 2) {
      try {
        const response = await axios.get(
          `https://route-init.gallimap.com/api/v1/search/autocomplete`,
          {
            params: {
              accessToken: "2d858743-50e4-43a9-9b0a-e4b6a5933b5d", // Replace with your actual GalliMaps access token
              word: input,
              lat: "27.6922368", // Replace these with actual values
              lng: "85.3245952", // Replace these with actual values
            },
          }
        );
        if (response.data && response.data.data) {
          setAutocompleteSuggestions((prev) => ({
            ...prev,
            [type]: response.data.data.map((item) => item.name),
          }));
        }
      } catch (error) {
        console.error(
          `Error fetching autocomplete suggestions for ${type}:`,
          error
        );
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/passenger/search?email=${email}`,
        {
          seats: seatsNeeded,
          daysOfWeek: selectedDays,
          ...formData,
        }
      );
      if (response.status === 200) {
        window.location.replace("/passenger/ride-history"); // Redirect to rides history page
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
                list="from-suggestions"
              />
              <datalist id="from-suggestions">
                {autocompleteSuggestions.from.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
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
                list="to-suggestions"
              />
              <datalist id="to-suggestions">
                {autocompleteSuggestions.to.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
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
              <input
                type="time"
                id="timeInput"
                name="time"
                style={{ margin: "20px 0" }}
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Seats needed:</label>
              <div className="seat-counter">
                <button type="button" onClick={decrementSeats}>
                  -
                </button>
                <span>{seatsNeeded}</span>
                <button type="button" onClick={incrementSeats}>
                  +
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>Days of the week:</label>
              <div className="weeks-group">
                <label>
                  <input
                    type="checkbox"
                    name="sunday"
                    value="sunday"
                    checked={selectedDays.includes("sunday")}
                    onChange={handleDayChange}
                  />
                  Sunday
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="monday"
                    value="monday"
                    checked={selectedDays.includes("monday")}
                    onChange={handleDayChange}
                  />
                  Monday
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="tuesday"
                    value="tuesday"
                    checked={selectedDays.includes("tuesday")}
                    onChange={handleDayChange}
                  />
                  Tuesday
                </label>
                {/* Wednesday */}
                <label>
                  <input
                    type="checkbox"
                    name="wednesday"
                    value="wednesday"
                    checked={selectedDays.includes("wednesday")}
                    onChange={handleDayChange}
                  />
                  Wednesday
                </label>
                {/* Thursday */}
                <label>
                  <input
                    type="checkbox"
                    name="thursday"
                    value="thursday"
                    checked={selectedDays.includes("thursday")}
                    onChange={handleDayChange}
                  />
                  Thursday
                </label>
                {/* Friday */}
                <label>
                  <input
                    type="checkbox"
                    name="friday"
                    value="friday"
                    checked={selectedDays.includes("friday")}
                    onChange={handleDayChange}
                  />
                  Friday
                </label>
                {/* Saturday */}
                <label>
                  <input
                    type="checkbox"
                    name="saturday"
                    value="saturday"
                    checked={selectedDays.includes("saturday")}
                    onChange={handleDayChange}
                  />
                  Saturday
                </label>
              </div>
            </div>
            <div className="btn-group">
              <button type="submit" className="btn-search">
                Search
              </button>
            </div>
          </form>
        </div>
        <Passenger_nav />
      </div>
    </>
  );
}
