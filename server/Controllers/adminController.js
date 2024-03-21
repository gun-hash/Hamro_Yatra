import User from "../Models/User.js";
import Ride from "../Models/Ride.js";


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

const viewRides = async (req, res) => {
  try {
    const rideHistory = await Ride.find();
    res.json({ rideHistory });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewUsers = async (req, res) => {
  try {
    const usersData = await User.find({isVerified: true});
    res.json({ usersData });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { profileData, viewRides, viewUsers }
