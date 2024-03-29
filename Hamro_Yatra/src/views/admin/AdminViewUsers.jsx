import axios from "axios";
import AdminNav from "../../components/admin/AdminNav";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import "../../assets/styles/Adminviewride.css";

function AdminViewUsers() {
  const { email } = useStateContext();
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the server using Axios
    axios
      .get(`http://localhost:8080/admin/view-users?email=${email}`)
      .then((response) => {
        // Set the rideHistory state with the response data
        setUsersData(response.data.usersData);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [email]);

  return (
    <div className="user-data-main-container">
      {loading ? null : <h2>All Users</h2>}
      <div className="users-data-container">
        {loading ? (
          <p>Loading...</p>
        ) : usersData === null ? (
          <p className="no-users-message">No Users Registered</p>
        ) : (
          usersData.map((user) => (
            <div className="user-card" key={user._id}>
              <h3>Name: {user.name}</h3>
              <p>Phone: {user.phone}</p>
              <p>Role: {user.role}</p>
              <p>Email: {user.email}</p>
            </div>
          ))
        )}
      </div>
      <AdminNav />
    </div>
  );
}

export default AdminViewUsers;
