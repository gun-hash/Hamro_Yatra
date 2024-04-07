import User from "../Models/User.js";
import DriverRide from "../Models/DriverRide.js";
import Ride from "../Models/Ride.js";
import Vehicle from "../Models/Vehicle.js";
import dotenv from "dotenv";
dotenv.config();

const profileData = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    const driverDefaultRide = await DriverRide.findOne({ driverID: currentUser._id })
    res.json({ currentUser, driverDefaultRide });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const matchData = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currUser = await User.findOne({ email: userEmail })
    const offeredRide = await DriverRide.find({ driverID: currUser._id.toString() });
    const currUserRideId = offeredRide[0]._id.toString()
    const allRides = await Ride.find({ status: 'unaccepted' })
    const rideAvailable = allRides.filter(ride => ride.recommendedTo.includes(currUserRideId));
    res.json({ rideAvailable });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const matchRide = async (req, res) => {
  const userEmail = req.query.email;
  const rideId = req.query.rideID;
  try {
    const matchedDriver = await User.findOne({ email: userEmail })

    await Ride.updateOne({ _id: rideId }, { driverID: matchedDriver._id })
    await Ride.updateOne({ _id: rideId }, { status: 'ongoing' })
    await DriverRide.updateOne({ driverID: matchedDriver._id.toString() }, { status: 'busy' })

    res.status(200).json({ message: "Ride Matched successfully" });
  } catch (error) {
    console.error("Error Matching Ride:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const completeRide = async (req, res) => {
  const userEmail = req.query.email;
  const rideId = req.query.rideID;
  try {
    const matchedDriver = await User.findOne({ email: userEmail })

    await Ride.updateOne({ _id: rideId }, { status: 'completed' })
    await DriverRide.updateOne({ driverID: matchedDriver._id.toString() }, { status: 'free' })

    res.status(200).json({ message: "Ride completed successfully" });
  } catch (error) {
    console.error("Error Matching Ride:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMatch = async (req, res) => {
  const userEmail = req.query.email;
  const rideId = req.query.rideID;
  try {
    const matchedDriver = await User.findOne({ email: userEmail })
    const thisRide = await Ride.find({ _id: rideId })
    if (thisRide.recommendedTo.includes(matchedDriver._id.toString())) {
      const index = thisRide.recommendedTo.indexOf(matchedDriver._id.toString())
      if (index > -1) {
        array.splice(index, 1);
      }
    }

    res.status(200).json({ message: "Ride Match Deleted successfully" });
  } catch (error) {
    console.error("Error Matching Ride:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const setDefaultRide = async (req, res) => {
  const { from, to, date, seats, time, daysOfWeek, fromlanglat, tolanglat } = req.body;
  const { email } = req.query;

  try {
    const driverUser = await User.findOne({ email: email });
    if (!driverUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const defaultCreatedDocs = await DriverRide.find({ driverID: driverUser._id });
    let isFound = false;
    if (defaultCreatedDocs.length > 0) {
      isFound = true;
    }

    if (isFound) {
      return res.status(500).json({ error: "Default Ride Already Created" });
    }

    const newDriverRide = new DriverRide({
      email,
      seats,
      from,
      to,
      date,
      driverID: driverUser._id,
      time,
      fromlanglat,
      tolanglat,
      daysOfWeek,
    });

    await newDriverRide.save()

    res.status(200).json({ message: "Ride Saved" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerVehicle = async (req, res) => {
  const { number, color, model, type } = req.body;
  const { email } = req.query;

  try {
    const driverUser = await User.findOne({ email: email });
    if (!driverUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const defaultCreatedDocs = await Vehicle.find({ driverID: driverUser._id });
    let isFound = false;
    if (defaultCreatedDocs.length > 0) {
      isFound = true;
    }

    if (isFound) {
      return res.status(500).json({ error: "Vehicle Already Registered." });
    }

    const newVehicle = new Vehicle({
      number,
      color,
      model,
      type,
      driverID: driverUser._id,
    });

    await newVehicle.save()

    res.status(200).json({ message: "Vehicle Registered" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rideHistory = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    const rideHistory = await Ride.find({ driverID: currentUser._id })
    res.json({ rideHistory });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDefaultRide = async (req, res) => {
  const userEmail = req.query.email;
  const currUser = await User.findOne({ email: userEmail })
  const rideToBeDeleted = await DriverRide.findOne({ driverID: currUser._id })
  try {
    // Delete the ride by its ID
    await DriverRide.findByIdAndDelete(rideToBeDeleted._id);
    // Respond with a success status code
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting ride:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { profileData, registerVehicle, setDefaultRide, matchData, matchRide, rideHistory, deleteDefaultRide, deleteMatch, completeRide };