import { useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axios from "axios";
import LogoutButton from "../../components/common/LogoutButton";

export default function AdminDashboard() {
  const { email } = useStateContext();
  console.log(email);

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/all?email=${email}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error.message);
      });
  }, [email]);

  return (
  <>
  <div>Admin Dashboard</div>
  <LogoutButton/>
  </>);
}
