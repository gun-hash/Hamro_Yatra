import { useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axios from "axios";

export default function DriverDashboard() {
  const { email } = useStateContext();
  console.log(email);

  useEffect(() => {
    axios.get(`http://localhost:8080/driver/all?email=${email}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error.message);
        // Handle the error as needed (e.g., show an error message to the user)
      });
  }, [email]);

  return <div>Driver Dashboard</div>;
}
