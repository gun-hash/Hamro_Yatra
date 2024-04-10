import axios from "axios";
import "../../assets/styles/passenger.css";
import Passenger_nav from "../../components/passenger/passenger_nav";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import "../../assets/styles/passanger_history.css";

function PassengerRideHistory() {
  const { email } = useStateContext();
  const [rideHistory, setRideHistory] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/passenger/history?email=${email}`)
      .then((response) => {
        setRideHistory(response.data.rideHistory);
        setVehicleInfo(response.data.vehicleInfo)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [email]);

  const handleDeleteRide = async (rideId) => {
    try {
      await axios
        .get(
          `http://localhost:8080/passenger/deleteride?email=${email}&rideID=${rideId}`
        )
        .then((res) => {
          setRideHistory((prevRides) =>
            prevRides.filter((ride) => ride._id !== rideId)
          );
        });
    } catch (error) {
      console.error("Error deleting ride:", error);
    }
  };

  return (
    <div className="ride-history-main-container">
      {loading ? null : <h2>Ride Details</h2>}
      <div className="ride-history-table-container">
        {loading ? (
          <p>Loading...</p>
        ) : rideHistory === null ? (
          <p className="no-rides-message">No ride history</p>
        ) : (
          <table className="ride-history-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>From</th>
                <th>To</th>
                <th>Fare</th>
                <th>Date</th>
                <th>Time</th>
                <th>Seats</th>
                <th>Days of Week</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rideHistory.map((ride) => (
                <tr key={ride._id}>
                  <td>{ride.status}</td>
                  <td>{ride.from}</td>
                  <td>{ride.to}</td>
                  <td>{ride.fare}</td>
                  <td>{ride.date}</td>
                  <td>{ride.time}</td>
                  <td>{ride.seats}</td>
                  <td>{ride.daysOfWeek.join(", ")}</td>
                  <td>
                    {ride.status === "unaccepted" && (
                      <button onClick={() => handleDeleteRide(ride._id)}>
                        Cancel Ride
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Passenger_nav />
    </div>
  );
}

export default PassengerRideHistory;
