import React, { useState } from 'react';
import DriverNav from '../../components/driver/DriverNav';
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";


const DriverVehicleRegistration = () => {

    const { email } = useStateContext();

    const [vehicleData, setVehicleData] = useState({
        number: '',
        color: '',
        model: '',
        type: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8080/driver/registervehicle?email=${email}`,
                {
                    ...vehicleData,
                }
            );
            if (response.status === 200) {
                window.location.replace("/driver/profile"); // Redirect to profile page
            } else {
                console.error("Error saving ride");
                // Handle other status codes if needed
            }
        } catch (error) {
            console.error("Error searching for ride:", error.message);
        }
    };

    return (
        <div>
            <h2>Register Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="number">Number:</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={vehicleData.number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="color">Color:</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={vehicleData.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="model">Model:</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={vehicleData.model}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="type">Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={vehicleData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="scooter">Scooter</option>
                        <option value="bike">Bike</option>
                        <option value="car">Car</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            <DriverNav />
        </div>
    );
};

export default DriverVehicleRegistration;
