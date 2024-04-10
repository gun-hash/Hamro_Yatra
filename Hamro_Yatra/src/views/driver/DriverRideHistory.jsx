import axios from "axios";
import DriverNav from "../../components/driver/DriverNav";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import "../../assets/styles/Driver.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

function DriverRideHistory() {
  const { email } = useStateContext();
  const [rideHistory, setRideHistory] = useState(null);
  const [phone, setPhone] = useState(null)
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState([]);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [passengerlocation, setPassengerLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = async (rideId) => {
    setModalOpen(true);
    // Check if the Geolocation API is supported
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set the latitude and longitude upon successful retrieval
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // Handle errors
          window.alert(error.message)
        }
      );
    } else {
      window.alert("Geolocation is not supported by this browser.")
    }

    try {
      await axios
        .get(
          `http://localhost:8080/driver/getpassengerlocation?email=${email}&rideID=${rideId}`
        )
        .then((res) => {
          setPassengerLocation({
            latitude: parseFloat(res.data.passengerLocation.lat),
            longitude: parseFloat(res.data.passengerLocation.lng),
          });
        });
    } catch (error) {
      console.error("Error getting passenger location:", error);
    }

    if (location.latitude && location.longitude && passengerlocation.latitude && passengerlocation.longitude) {
      const osrmRouteUrl = `https://router.project-osrm.org/route/v1/driving/${location.longitude},${location.latitude};${passengerlocation.longitude},${passengerlocation.latitude}?overview=full&geometries=geojson`;

      try {
        const response = await axios.get(osrmRouteUrl);
        const coords = response.data.routes[0].geometry.coordinates;
        const latLngs = coords.map((coord) => [coord[1], coord[0]]);
        setRoute(latLngs); // Set the route state
      } catch (error) {
        console.error("Failed to fetch route", error);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };


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

  const handlePhone = async (rideId) => {
    try {
      await axios
        .get(
          `http://localhost:8080/driver/getcontact?email=${email}&rideID=${rideId}`
        )
        .then((res) => {
          setPhone(res.data.phone)
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
                    <div className="action-for-drivers">
                      <button onClick={() => handlePhone(ride._id)} className="call-btn-pass">
                        <a href={`tel:${phone}`} className="call-button">
                          Call Passenger
                        </a>
                      </button>
                      <div className="ModalContainer">
                        <button type="button" onClick={() => openModal(ride._id)} className="view-btn">
                          Get Passenger Pickup Location
                        </button>
                        {modalOpen && (
                          <div className="modal-overlay">
                            <div className="modal-content">
                              <span className="close" onClick={closeModal}>
                                &times;
                              </span>
                              <div className="map-container">
                                <p className="heading">Route</p>
                                {location.latitude &&
                                  location.longitude &&
                                  passengerlocation.latitude &&
                                  passengerlocation.longitude && (
                                    <MapContainer
                                      center={[
                                        (location.latitude + passengerlocation.latitude) / 2,
                                        (location.longitude + passengerlocation.longitude) / 2,
                                      ]}
                                      zoom={13}
                                      scrollWheelZoom={false}
                                      style={{ height: "400px", width: "100%" }}
                                    >
                                      <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                      />
                                      <Marker position={[location.latitude, location.longitude]}>
                                        <Popup>Your Location</Popup>
                                      </Marker>
                                      <Marker position={[passengerlocation.latitude, passengerlocation.longitude]}>
                                        <Popup>Passenger Location</Popup>
                                      </Marker>
                                      {route.length > 0 && (
                                        <Polyline positions={route} color="blue" />
                                      )}{" "}
                                      {/* Draw the route */}
                                    </MapContainer>
                                  )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
