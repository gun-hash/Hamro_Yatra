import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['scooter', 'bike', 'car']
    },
    driverID: {
        type: String,
        required: true,
    },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;