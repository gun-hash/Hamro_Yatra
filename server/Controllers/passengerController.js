import User from "../Models/User.js";
import Ride from "../Models/Ride.js";
import dotenv from "dotenv";
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
  const { from, to, date, seats } = req.body;
  const { email } = req.query;

  try {
    const rideReqUser = await User.findOne({email: email});
    if (!rideReqUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const newRide = new Ride({
      email: email,
      seats: seats,
      from: from,
      to: to,
      date: date,
      fare: 1200,
      passengerID: rideReqUser._id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'unaccepted'
    });

    await newRide.save()

    res.status(200).json({ message: "Ride Saved" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const history = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    res.json({ currentUser });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { profileData, search, history };