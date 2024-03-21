import mongoose from "mongoose";

const DriverRideSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String, // Changed type to String
    required: true,
  },
  driverID: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Assuming time will be stored as string HH:MM format
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  daysOfWeek: {
    type: [String], // Array of strings
    required: true
    },
});

const DriverRide = mongoose.model("DriverRide", DriverRideSchema);

export default DriverRide;
