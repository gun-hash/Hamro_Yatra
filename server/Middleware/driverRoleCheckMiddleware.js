import User from "../Models/User.js";

export const driverRoleCheckMiddleware = async (req, res, next) => {
  const { email } = req.query;

  try {
    const loggedInUser = await User.findOne({ email });
    if (loggedInUser.role === "driver") {
      next();
    } else {
      return res.status(401).json({ message: "User not Authorized." });
    }
  } catch (e) {
    res.status(404).json({ message: "User not Logged in", error: e });
  }
};
