import axios from 'axios';
import DriverNav from '../../components/driver/DriverNav';
import { useStateContext } from '../../context/ContextProvider';
import { useEffect, useState } from 'react';


function DriverMatch() {

    const { email } = useStateContext();
    const [rideAvailable, setRideAvailable] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data from the server using Axios
        axios.get(`http://localhost:8080/driver/searchmatch?email=${email}`)
            .then(response => {
                // Set the rideHistory state with the response data
                setRideAvailable(response.data.rideAvailable);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, [email]);

    const handleMatchRide = async (rideId) => {
        try {
            // Make a DELETE request to the backend to delete the ride
            await axios.get(`http://localhost:8080/driver/matchride?email=${email}&rideID=${rideId}`)
                .then((res) => {
                    // Filter out the deleted ride from the rideHistory
                    setRideAvailable(prevRides => prevRides.filter(ride => ride._id !== rideId));
                })

            window.location.href = '/driver';

        } catch (error) {
            console.error('Error matching ride:', error);
        }
    };

    const handleDeleteMatchRide = async (rideId) => {
        try {
            // Make a DELETE request to the backend to delete the ride
            await axios.get(`http://localhost:8080/driver/deletematch?email=${email}&rideID=${rideId}`)
                .then((res) => {
                    // Filter out the deleted ride from the rideHistory
                    setRideAvailable(prevRides => prevRides.filter(ride => ride._id !== rideId));
                })

        } catch (error) {
            console.error('Error matching ride:', error);
        }
    };


    return (
        <>
            {loading ? null : <h2>Ride Details</h2>}
            <div className="ride-available-container">
                {loading ? (
                    <p>Loading...</p>
                ) : rideAvailable === null ? (
                    <p className="no-rides-message">No Rides To Match</p>
                ) :
                    (
                        rideAvailable.map(ride => (
                            <div className="ride-card" key={ride._id}>
                                <h3>Status: {ride.status}</h3>
                                <p>From: {ride.from}</p>
                                <p>To: {ride.to}</p>
                                <p>Fare: {ride.fare}</p>
                                <p>Date: {ride.date}</p>
                                <p>Time: {ride.time}</p>
                                <p>Seats: {ride.seats}</p>
                                <p>Days of Week: {ride.daysOfWeek.join(', ')}</p>
                                <button onClick={() => handleMatchRide(ride._id)}>Match</button>
                                <button onClick={() => handleDeleteMatchRide(ride._id)}>Delete</button>
                            </div>
                        ))
                    )}
            </div>
            <DriverNav />
        </>
    );
}

export default DriverMatch;
