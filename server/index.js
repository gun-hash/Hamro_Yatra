const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//db connection

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log("Database connected..");
});

app.use("/api", userRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
