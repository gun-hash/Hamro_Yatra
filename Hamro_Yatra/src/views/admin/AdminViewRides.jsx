import axios from 'axios';
import AdminNav from '../../components/admin/AdminNav';
import { useStateContext } from '../../context/ContextProvider';
import { useEffect, useState } from 'react';


function AdminViewRides() {

    const { email } = useStateContext();
    const [rideHistory, setRideHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data from the server using Axios
        axios.get(`http://localhost:8080/admin/view-rides?email=${email}`)
            .then(response => {
                // Set the rideHistory state with the response data
                setRideHistory(response.data.rideHistory);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, [email]);

    return (
        <>
            {loading ? null : <h2>Ride Details</h2>}
            <div className="ride-history-container">
                {loading ? (
                    <p>Loading...</p>
                ) : rideHistory === null ? (
                    <p className="no-rides-message">No ride history</p>
                ) :
                    (
                        rideHistory.map(ride => (
                            <div className="ride-card" key={ride._id}>
                                <h3>Status: {ride.status}</h3>
                                <p>From: {ride.from}</p>
                                <p>To: {ride.to}</p>
                                <p>Fare: {ride.fare}</p>
                                <p>Date: {ride.date}</p>
                                <p>Time: {ride.time}</p>
                                <p>Seats: {ride.seats}</p>
                                <p>Days of Week: {ride.daysOfWeek.join(', ')}</p>
                            </div>
                        ))
                    )}
            </div>
            <AdminNav />
        </>
    );
}

export default AdminViewRides;
