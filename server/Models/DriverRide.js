import mongoose from "mongoose";

const DriverRideSchema = new mongoose.Schema({
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
    },
  },
  tolanglat: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  driverID: {
    type: String,
    required: false,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  daysOfWeek: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    default: "free",
  },
});

const DriverRide = mongoose.model("DriverRide", DriverRideSchema);

export default DriverRide;
