import { useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axios from "axios";
import LogoutButton from "../../components/common/LogoutButton";

export default function PassengerDashboard() {
  const { email } = useStateContext();
  console.log(email);

  useEffect(() => {
    axios.get(`http://localhost:8080/passenger/all?email=${email}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching passenger data:", error.message);
      });
  }, [email]);

  return (<>
  <div>Passenger Dashboard</div>
  <LogoutButton/>
  </>);
}
