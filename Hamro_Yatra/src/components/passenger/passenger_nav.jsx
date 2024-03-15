import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import "./passenger_nav.css";

const Passenger_nav = () => {
  return (
    <div className="navbar">
      <Link to="/passenger/ride-history">
        <FontAwesomeIcon icon={faRoad} /> Ride History
      </Link>
      <Link to="/passenger/search">
        <FontAwesomeIcon icon={faSearch} /> Search
      </Link>
      <Link to="/passenger/profile">
        <FontAwesomeIcon icon={faUser} /> Profile
      </Link>
    </div>
  );
};

export default Passenger_nav;
