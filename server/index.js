import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import driverRoutes from "./Routes/driverRoutes.js";
import passengerRoutes from "./Routes/passengerRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//db connection
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log("Database connected..");
});

app.use("/api", userRoutes);
app.use("/admin", adminRoutes);
app.use("/driver", driverRoutes);
app.use("/passenger", passengerRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
