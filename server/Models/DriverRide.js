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
  fromlanglat: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    }
  },
  tolanglat: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    }
  },
  driverID: {
    type: String,
    required: false,
    unique: true
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
  status: {
    type: String,
    default: 'free'
  },
});

const DriverRide = mongoose.model("DriverRide", DriverRideSchema);

export default DriverRide;
