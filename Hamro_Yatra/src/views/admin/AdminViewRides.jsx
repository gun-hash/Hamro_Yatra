import axios from "axios";
import AdminNav from "../../components/admin/AdminNav";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import "../../assets/styles/Adminviewride.css";

function AdminViewRides() {
  const { email } = useStateContext();
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ride data from the server using Axios
    axios
      .get(`http://localhost:8080/admin/view-rides?email=${email}`)
      .then((response) => {
        // Set the rideHistory state with the response data
        setRideHistory(response.data.rideHistory);
        console.log(response);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching ride data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [email]);

  // Filter rides based on boolean status
  const ongoingRides = rideHistory.filter((ride) => ride.status === "ongoing");
  const pendingRides = rideHistory.filter(
    (ride) => ride.status === "unaccepted"
  );

  // Helper function to render ride rows
  const renderRideRows = (rides) =>
    rides.map((ride) => (
      <tr key={ride._id}>
        <td>{ride.from}</td>
        <td>{ride.to}</td>
        <td>{ride.fare}</td>
        <td>{new Date(ride.date).toLocaleDateString()}</td>
        <td>{ride.time}</td>
        <td>{ride.seats}</td>
        <td>{ride.daysOfWeek.join(", ")}</td>
        <td style={{ color: ride.status === "ongoing" ? "green" : "red" }}>
          {ride.status}
        </td>
      </tr>
    ));

  return (
    <div className="ride-history-main-container">
      <h2>Ride Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Ongoing Rides</h3>
          <table className="ride-history-table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Fare</th>
                <th>Date</th>
                <th>Time</th>
                <th>Seats</th>
                <th>Days of Week</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ongoingRides.length > 0 ? (
                renderRideRows(ongoingRides)
              ) : (
                <tr>
                  <td colSpan="8">No ongoing rides.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h3>Unaccepted Rides</h3>
          <table className="ride-history-table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Fare</th>
                <th>Date</th>
                <th>Time</th>
                <th>Seats</th>
                <th>Days of Week</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingRides.length > 0 ? (
                renderRideRows(pendingRides)
              ) : (
                <tr>
                  <td colSpan="8">No pending rides.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      <AdminNav />
    </div>
  );
}

export default AdminViewRides;
