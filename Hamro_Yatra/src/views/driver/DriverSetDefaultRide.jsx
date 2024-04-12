import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import DriverNav from "../../components/driver/DriverNav";
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

export default function DriverSetDefaultRide() {
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

  const [seatsAvailable, setSeatsAvailable] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: "", lng: "" });
  const [latLng, setLatLng] = useState({ lat: "", lng: "" });
  const [desLatLng, setDesLatLng] = useState({ lat: "", lng: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (latLng.lat && latLng.lng && desLatLng.lat && desLatLng.lng) {
        const osrmRouteUrl = `https://router.project-osrm.org/route/v1/driving/${latLng.lng},${latLng.lat};${desLatLng.lng},${desLatLng.lat}?overview=full&geometries=geojson`;

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

    if (modalOpen) {
      fetchRoute();
    }
  }, [modalOpen, latLng, desLatLng]);

  const fetchLongLat = async () => {
    const response = await axios.get(
      "https://route-init.gallimap.com/api/v1/search/currentLocation",
      {
        params: {
          accessToken: "2d858743-50e4-43a9-9b0a-e4b6a5933b5d",
          name: formData.from,
          currentLat: userLocation.lat,
          currentLng: userLocation.lng,
        },
      }
    );

    const res = await axios.get(
      "https://route-init.gallimap.com/api/v1/search/currentLocation",
      {
        params: {
          accessToken: "2d858743-50e4-43a9-9b0a-e4b6a5933b5d",
          name: formData.to,
          currentLat: userLocation.lat,
          currentLng: userLocation.lng,
        },
      }
    );

    const fromLat = response.data.data.features[0].geometry.coordinates[1];
    const fromLng = response.data.data.features[0].geometry.coordinates[0];
    const toLat = res.data.data.features[0].geometry.coordinates[1];
    const toLng = res.data.data.features[0].geometry.coordinates[0];
    setLatLng({ lat: fromLat, lng: fromLng });
    setDesLatLng({ lat: toLat, lng: toLng });
  };

  const openModal = async () => {
    setModalOpen(true);

    await fetchLongLat();

    const resp = await axios.get(
      "https://route-init.gallimap.com/api/v1/routing",
      {
        params: {
          mode: "driving",
          srcLat: fromLat,
          srcLng: fromLng,
          dstLat: toLat,
          dstLng: toLng,
          accessToken: "2d858743-50e4-43a9-9b0a-e4b6a5933b5d",
        },
      }
    );
    console.log(resp);
    // // console.log(response.data.data.features[0].geometry.coordinates)
    // console.log(res.data.data.features[0].geometry.coordinates)
    // console.log(response);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation permission denied or not available", error);
        // Handle fallback or error state here
      }
    );
  }, []);

  // useEffect(() => {
  //   setLatLng({ lat: userLocation.lat, lng: userLocation.lng });
  // }, [userLocation]);

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
              accessToken: "2d858743-50e4-43a9-9b0a-e4b6a5933b5d",
              word: input,
              lat: userLocation.lat,
              lng: userLocation.lng,
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
    await fetchLongLat();
    try {
      const response = await axios.post(
        `http://localhost:8080/driver/setdefaultride?email=${email}`,
        {
          seats: seatsAvailable,
          daysOfWeek: selectedDays,
          fromlanglat: latLng,
          tolanglat: desLatLng,
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
            <div className="ModalContainer">
              <button onClick={openModal} className="view-btn ">
                View Location on Map
              </button>
              {modalOpen && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <div
                      className="main-map-container"
                      style={{ width: "100%", overflow: "hidden" }}
                    >
                      <div className="map-container">
                        <p className="heading">Route</p>
                        {latLng.lat &&
                          latLng.lng &&
                          desLatLng.lat &&
                          desLatLng.lng && (
                            <MapContainer
                              center={[
                                (latLng.lat + desLatLng.lat) / 2,
                                (latLng.lng + desLatLng.lng) / 2,
                              ]}
                              zoom={13}
                              scrollWheelZoom={false}
                              style={{ height: "400px", width: "100%" }}
                            >
                              <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              />
                              <Marker position={[latLng.lat, latLng.lng]}>
                                <Popup>Starting Location</Popup>
                              </Marker>
                              <Marker position={[desLatLng.lat, desLatLng.lng]}>
                                <Popup>Destination</Popup>
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
                </div>
              )}
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
            <div className="week-group">
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
