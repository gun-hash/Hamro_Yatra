import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const DriverNav = () => {
    return (
        <div className="navbar">
            <Link to="/driver/ride-history">
                <FontAwesomeIcon icon={faRoad} /> Ride History
            </Link>
            <Link to="/driver/match">
                <FontAwesomeIcon icon={faSearch} /> Search
            </Link>
            <Link to="/driver/set-default">
                <FontAwesomeIcon icon={faSearch} /> Set Default Ride
            </Link>
            <Link to="/driver/register-vehicle">
                <FontAwesomeIcon icon={faSearch} /> Register Vehicle
            </Link>
            <Link to="/driver/profile">
                <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
        </div>
    );
};

export default DriverNav;
