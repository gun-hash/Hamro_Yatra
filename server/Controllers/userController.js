const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User with this email does not exist." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      "mU_ldalQXHJPm1Su5e_HHy4gjxFEJbWjy_1_SthOjj8",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
};
