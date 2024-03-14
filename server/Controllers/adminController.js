import User from "../Models/User.js";
const test = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json({ allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {test}
