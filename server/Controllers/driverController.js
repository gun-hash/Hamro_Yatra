import User from "../Models/User.js";
import dotenv from "dotenv";
dotenv.config();

const test = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    console.log(currentUser);
    res.json({ currentUser });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { test };