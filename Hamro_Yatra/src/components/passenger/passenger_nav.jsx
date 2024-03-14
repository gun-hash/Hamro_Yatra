import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import "./passenger_nav.css";

const Passenger_nav = () => {
  return (
    <div className="navbar">
      <a href="#">
        <FontAwesomeIcon icon={faRoad} /> Ride History
      </a>
      <a href="#">
        <FontAwesomeIcon icon={faSearch} /> Search
      </a>
      <a href="#">
        <FontAwesomeIcon icon={faUser} /> Profile
      </a>
    </div>
  );
};

export default Passenger_nav;
