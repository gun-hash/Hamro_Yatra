import axios from "axios";
import "../../assets/styles/passenger.css";
import Passenger_nav from "../../components/passenger/passenger_nav";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import "../../assets/styles/passanger_history.css";

function PassengerRideHistory() {
  const { email } = useStateContext();
  const [rideHistory, setRideHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the server using Axios
    axios
      .get(`http://localhost:8080/passenger/history?email=${email}`)
      .then((response) => {
        // Set the rideHistory state with the response data
        setRideHistory(response.data.rideHistory);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [email]);

  const handleDeleteRide = async (rideId) => {
    try {
      // Make a DELETE request to the backend to delete the ride
      await axios
        .get(
          `http://localhost:8080/passenger/deleteride?email=${email}&rideID=${rideId}`
        )
        .then((res) => {
          // Filter out the deleted ride from the rideHistory
          setRideHistory((prevRides) =>
            prevRides.filter((ride) => ride._id !== rideId)
          );
        });
    } catch (error) {
      console.error("Error deleting ride:", error);
    }
  };

  return (
    <>
      <div className="ride-history-main-container">
        {loading ? null : <h2>Ride Details</h2>}
        <div className="ride-history-container">
          {loading ? (
            <p>Loading...</p>
          ) : rideHistory === null ? (
            <p className="no-rides-message">No ride history</p>
          ) : (
            rideHistory.map((ride) => (
              <div className="ride-card" key={ride._id}>
                <h3>Status: {ride.status}</h3>
                <p>From: {ride.from}</p>
                <p>To: {ride.to}</p>
                <p>Fare: {ride.fare}</p>
                <p>Date: {ride.date}</p>
                <p>Time: {ride.time}</p>
                <p>Seats: {ride.seats}</p>
                <p>Days of Week: {ride.daysOfWeek.join(", ")}</p>
                {ride.status === "unaccepted" && (
                  <button onClick={() => handleDeleteRide(ride._id)}>
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        <Passenger_nav />
      </div>
    </>
  );
}

export default PassengerRideHistory;
