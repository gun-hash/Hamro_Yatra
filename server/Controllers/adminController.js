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
    const usersData = await User.find({ isVerified: true });
    res.json({ usersData });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// DELETE a user by ID
const deleteUser = async (req, res) => {
  const userId = req.body.id; // Assuming you're getting the ID as a URL parameter
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: `User with ID ${userId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// SUSPEND a user by ID
const suspendUser = async (req, res) => {
  const userId = req.body.id; // Assuming you're getting the ID as a URL parameter
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isSuspended = !user.isSuspended; // Assuming the user schema has an 'isSuspended' field
    await user.save();
    res.json({ message: `User with ID ${userId} suspended successfully` });
  } catch (error) {
    console.error("Error suspending user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { profileData, viewRides, viewUsers, suspendUser, deleteUser };
