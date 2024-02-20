const express = require("express");
const router = express.Router();
const passengerController = require("../Controllers/passengerController");

router.post("/book", passengerController.bookRide);

module.exports = router;
