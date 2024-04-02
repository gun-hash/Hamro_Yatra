import User from "../Models/User.js";
import DriverRide from "../Models/DriverRide.js";
import Ride from "../Models/Ride.js";
import dotenv from "dotenv";
dotenv.config();

const profileData = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    const driverDefaultRide = await DriverRide.findOne({ driverID: currentUser._id })
    res.json({ currentUser, driverDefaultRide });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const matchData = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const rideAvailable = await Ride.find({ status: 'unaccepted' })
    res.json({ rideAvailable });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const matchRide = async (req, res) => {
  const userEmail = req.query.email;
  const rideId = req.query.rideID;
  try {
    const matchedDriver = await User.findOne({ email: userEmail })

    await Ride.updateOne({ _id: rideId }, { driverID: matchedDriver._id })
    await Ride.updateOne({ _id: rideId }, { status: 'Ongoing' })

    res.status(200).json({ message: "Ride Matched successfully" });
  } catch (error) {
    console.error("Error Matching Ride:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const setDefaultRide = async (req, res) => {
  const { from, to, date, seats, time, daysOfWeek, fromlanglat, tolanglat } = req.body;
  const { email } = req.query;

  try {
    const driverUser = await User.findOne({ email: email });
    if (!driverUser) {
      return res.status(404).json({ error: "User not found" });
    }


    const newDriverRide = new DriverRide({
      email,
      seats,
      from,
      to,
      date,
      driverID: driverUser._id,
      time,
      fromlanglat,
      tolanglat,
      daysOfWeek,
    });

    await newDriverRide.save()

    res.status(200).json({ message: "Ride Saved" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rideHistory = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    const rideHistory = await Ride.find({ driverID: currentUser._id })
    res.json({ rideHistory });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { profileData, setDefaultRide, matchData, matchRide, rideHistory };