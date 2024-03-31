import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import DriverNav from "../../components/driver/DriverNav";
import "../../assets/styles/Driver.css";
export default function DriverSetDefaultRide() {
  const { email } = useStateContext();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
  });

  const [seatsAvailable, setSeatsAvailable] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);

  const incrementSeats = () => {
    if (seatsAvailable < 3) {
      setSeatsAvailable((prevSeats) => prevSeats + 1);
    }
  };

  const decrementSeats = () => {
    if (seatsAvailable > 1) {
      setSeatsAvailable((prevSeats) => prevSeats - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
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
  };

  const handleDayChange = (e) => {
    const { value } = e.target;
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/driver/setdefaultride?email=${email}`,
        {
          seats: seatsAvailable,
          daysOfWeek: selectedDays,
          ...formData,
        }
      );
      if (response.status === 200) {
        window.location.replace("/driver/profile"); // Redirect to profile page
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
      <div className="driver-main-container">
        <div className="set-default-ride-container">
          <h3>Set Default ride</h3>
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
              <label>Seats Available:</label>
              <div className="seat-counter">
                <button type="button" onClick={decrementSeats}>
                  -
                </button>
                <span>{seatsAvailable}</span>
                <button type="button" onClick={incrementSeats}>
                  +
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>Days of the week:</label>
              <div>
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
            <div className="btn-group" style={{ marginTop: "22px" }}>
              <button type="submit" className="btn-search">
                Set Default Ride
              </button>
            </div>
          </form>
        </div>
        <DriverNav />
      </div>
    </>
  );
}
