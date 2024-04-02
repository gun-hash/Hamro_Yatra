import mongoose from "mongoose";

const RideSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
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
  fare: {
    type: Number,
    required: true,
  },
  driverID: {
    type: String,
    required: false,
  },
  passengerID: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
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

const Ride = mongoose.model("Ride", RideSchema);

export default Ride;
