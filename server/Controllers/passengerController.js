import User from "../Models/User.js";
import Ride from "../Models/Ride.js";
import dotenv from "dotenv";
import DriverRide from "../Models/DriverRide.js";
import { matchPassengerToDrivers } from "../Scripts/knn.js";
import { fareCalc } from "../Scripts/fare.js";

dotenv.config();

const profileData = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    res.json({ currentUser });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const search = async (req, res) => {
  const { from, to, date, seats, time, daysOfWeek, fromlanglat, tolanglat } = req.body;
  const { email } = req.query;

  try {
    const rideReqUser = await User.findOne({ email: email });
    if (!rideReqUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const currRide = { seats, date, fromlanglat, tolanglat, passengerID: rideReqUser._id, time, daysOfWeek }

    const freeDrivers = await DriverRide.find({ status: 'free' });
    const matchedDrivers = await matchPassengerToDrivers(currRide, freeDrivers);
    const calculatedFare = fareCalc(currRide)
    const newRide = new Ride({
      email,
      seats,
      from,
      to,
      date,
      fromlanglat,
      tolanglat,
      fare: calculatedFare,
      passengerID: rideReqUser._id,
      time,
      status: 'unaccepted',
      daysOfWeek,
      recommendedTo: matchedDrivers,
    });

    await newRide.save();

    res.status(200).json({ message: "Ride Saved", matchedDrivers });
  } catch (error) {
    console.error("Error saving ride:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const history = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    const rideHistory = await Ride.find({ passengerID: currentUser._id });
    res.json({ rideHistory });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRide = async (req, res) => {
  const userEmail = req.query.email;
  const rideId = req.query.rideID; // Corrected variable name to rideId
  try {
    // Delete the ride by its ID
    await Ride.findByIdAndDelete(rideId);
    // Respond with a success status code
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting ride:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { profileData, search, history, deleteRide };
