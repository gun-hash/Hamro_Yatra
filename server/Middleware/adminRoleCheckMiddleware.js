import User from "../Models/User.js";

const adminRoleCheck = async (req, res, next) => {
  const email = req.query.email;
  try {
    const loggedInUser = await User.findOne({ email });
    if (loggedInUser.role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "User not Authorized." });
    }
  } catch (e) {
    res.status(404).json({ message: "User not Logged in", error: e });
  }
};

export default adminRoleCheck;
