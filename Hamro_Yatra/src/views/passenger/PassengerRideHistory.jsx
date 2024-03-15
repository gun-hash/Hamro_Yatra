import '../../assets/styles/passenger.css'; // Import your CSS file for styling
import Passenger_nav from '../../components/passenger/passenger_nav';


function PassengerRideHistory() {
// Empty dependency array ensures this effect runs only once on component mount

  return (
    <>
      <div className="ride-history-container"> 
      <p className="no-rides-message">No ride history</p>
      </div>
      <Passenger_nav />
    </>
  );
}

export default PassengerRideHistory;
