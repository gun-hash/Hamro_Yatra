import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faUser } from "@fortawesome/free-solid-svg-icons";

const AdminNav = () => {
    return (
        <div className="navbar">
            <Link to="/admin/view-rides">
                <FontAwesomeIcon icon={faRoad} /> View Rides
            </Link>
            <Link to="/admin/view-users">
                <FontAwesomeIcon icon={faUser} /> View Users
            </Link>
            <Link to="/admin/profile">
                <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
        </div>
    );
};

export default AdminNav;
