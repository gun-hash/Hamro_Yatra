import axios from "axios";
import AdminNav from "../../components/admin/AdminNav";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import "../../assets/styles/Adminviewride.css";

function AdminViewUsers() {
  const { email } = useStateContext();
  const [usersData, setUsersData] = useState({ drivers: [], passengers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersData();
  }, [email]);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/view-users?email=${email}`
      );
      const drivers = response.data.usersData.filter(
        (user) => user.role === "driver"
      );
      const passengers = response.data.usersData.filter(
        (user) => user.role === "passenger"
      );
      setUsersData({ drivers, passengers });
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
    setLoading(false);
  };

  const suspendUser = async (userId) => {
    try {
      await axios.post(
        `http://localhost:8080/admin/suspend-user?email=${email}`,
        {
          id: userId,
        }
      );
      await fetchUsersData(); // Re-fetch users data to update the table
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.post(
        `http://localhost:8080/admin/delete-user?email=${email}`,
        {
          id: userId,
        }
      );
      await fetchUsersData(); // Re-fetch users data to update the table
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Helper function to render user rows
  const renderUserRows = (users) =>
    users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>{user.isSuspended ? "Suspended" : "Active"}</td>
        <td>
          <button
            onClick={() => suspendUser(user._id)}
            type="button"
            className="btn-sus"
          >
            {user.isSuspended ? "Unsuspend" : "Suspend"}
          </button>{" "}
          |{" "}
          <button
            onClick={() => deleteUser(user._id)}
            type="button"
            className="btn-del"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="user-data-main-container">
      <h2>Admin - View Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Drivers</h3>
          <table className="users-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.drivers.length > 0 ? (
                renderUserRows(usersData.drivers, "driver")
              ) : (
                <tr>
                  <td colSpan="5">No drivers registered.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h3>Passengers</h3>
          <table className="users-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.passengers.length > 0 ? (
                renderUserRows(usersData.passengers, "passenger")
              ) : (
                <tr>
                  <td colSpan="5">No passengers registered.</td>
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

export default AdminViewUsers;
