import axios from "axios";
import "../../assets/styles/passenger.css";
import Passenger_nav from "../../components/passenger/passenger_nav";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import "../../assets/styles/passanger_history.css";
import 'reactjs-popup/dist/index.css';

function PassengerRideHistory() {
  const { email } = useStateContext();
  const [rideHistory, setRideHistory] = useState(null);
  const [phone, setPhone] = useState(null);
  const [driverName, setDriverName] = useState(null);
  const [vehicleNum, setVehicleNum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/passenger/history?email=${email}`)
      .then((response) => {
        setRideHistory(response.data.rideHistory);
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

  const handlePhone = async (rideId) => {
    try {
      await axios
        .get(
          `http://localhost:8080/passenger/getcontact?email=${email}&rideID=${rideId}`
        )
        .then((res) => {
          setPhone(res.data.phone)
        });
    } catch (error) {
      console.error("Error deleting ride:", error);
    }
  };
  const handleDriverDetail = async (rideId) => {
    setIsModalVisible(true)
    try {
      await axios
        .get(
          `http://localhost:8080/passenger/getdriverdetail?email=${email}&rideID=${rideId}`
        )
        .then((res) => {
          setDriverName(res.data.name)
          setVehicleNum(res.data.number)
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
                    {ride.status !== "unaccepted" && (
                      <button onClick={() => handlePhone(ride._id)} className="call-btn-pass">
                        <a href={`tel:${phone}`} className="call-button">
                          Call Driver
                        </a>
                      </button>
                    )}
                    {ride.status !== "unaccepted" && (
                      <button onClick={() => handleDriverDetail(ride._id)}
                        className="call-btn-pass">
                        View Driver Detail
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {isModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalVisible(false)}>
                &times;
              </span>
              <p>Name: {driverName}</p>
              <p>Vehicle Number: {vehicleNum}</p>
            </div>
          </div>
        )}
      </div>
      <Passenger_nav />
    </div >
  );
}

export default PassengerRideHistory;
