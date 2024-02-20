exports.bookRide = async (req, res) => {
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
