import axios from "axios";
import DriverNav from "../../components/driver/DriverNav";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import "../../assets/styles/Driver.css";

function DriverRideHistory() {
  const { email } = useStateContext();
  const [rideHistory, setRideHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/driver/history?email=${email}`)
      .then((response) => {
        setRideHistory(response.data.rideHistory);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [email]);

  const handleCompleteRide = async (rideId) => {
    try {
      // Make a DELETE request to the backend to delete the ride
      await axios
        .get(
          `http://localhost:8080/driver/completeride?email=${email}&rideID=${rideId}`
        )
        .then((res) => {
          window.location.reload()
        });
    } catch (error) {
      console.error("Error deleting ride:", error);
    }
  };

  return (
    <div className="history-main-conatiner">
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
                    {ride.status === "ongoing" && (
                      <button onClick={() => handleCompleteRide(ride._id)}>Complete Ride</button>
                    )}
                  </td>                  <td>
                    <div className="action-for-divers">
                      <button className="call-btn-pass">
                        <a href="tel:+977-9865630599" className="call-button">
                          Call Passanger
                        </a>
                      </button>

                      <button className="view-location-pass">
                        View Passanger Location
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DriverNav />
    </div>
  );
}

export default DriverRideHistory;
