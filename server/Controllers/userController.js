import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Config/nodemailerConfig.js";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { password, email, ...userData } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign(
      { email: req.body.email },
      process.env.NODEMAILER_AUTH_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const newUser = new User({
      ...userData,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
      isVerified: false,
    });

    await newUser.save();

    const subject = "Verify Your Email";
    const encodedToken = encodeURIComponent(verificationToken);
    const text = `Please click the link to verify your email: http://localhost:8080/api/verify?token=${encodedToken} . This link will expire in 1 day.`;

    try {
      await sendEmail(email, subject, text);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.NODEMAILER_AUTH_SECRET_KEY);

    // Find the user in the database based on the email from the token
    const user = await User.findOne({
      email: { $regex: new RegExp("^" + decoded.email, "i") },
    });


    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified" });
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save();


    // Redirect to the login page or send a success response
    res.send('<a href="http://localhost:5173/login">Success Go to login</a>'); // You can modify the redirect URL based on your project structure
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(400).json({ error: "Invalid verification token" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User with this email does not exist." });
    }
    if (!user.isVerified) {
      const subject = "Verify Your Email";
      const encodedToken = encodeURIComponent(user.verificationToken);
      const text = `Please click the link to verify your email: http://localhost:8080/api/verify?token=${encodedToken} . This link will expire in 1 day.`;

      try {
        await sendEmail(user.email, subject, text);
      } catch (error) {
        console.error("Error sending email:", error.message);
      }
      return res
        .status(200)
        .json({ message: "Email not verified. Check your mail." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    const authtoken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ email: user.email, role: user.role, authtoken, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

