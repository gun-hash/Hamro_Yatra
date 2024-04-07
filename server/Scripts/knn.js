// Function to parse time strings into minutes for comparison
function parseTimeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

// Function to check if a driver's time is within an acceptable range of the passenger's requested time
function isTimeWithinRange(driverTime, passengerTime, rangeMinutes = 30) {
  const driverTimeMinutes = parseTimeToMinutes(driverTime);
  const passengerTimeMinutes = parseTimeToMinutes(passengerTime);
  const timeDifference = Math.abs(driverTimeMinutes - passengerTimeMinutes);
  return timeDifference <= rangeMinutes;
}

// Function to calculate the distance between two coordinates asynchronously
function calcDistance(srcLat, srcLng, dstLat, dstLng) {
  // Convert each parameter to a string and truncate to 16 characters if necessary
  srcLat = parseFloat(srcLat);
  srcLng = parseFloat(srcLng);
  dstLat = parseFloat(dstLat);
  dstLng = parseFloat(dstLng);
  // Earth radius in meters
  const R = 6371000;

  // Convert latitude and longitude from degrees to radians
  const lat1 = (srcLat * Math.PI) / 180;
  const lat2 = (dstLat * Math.PI) / 180;
  const deltaLat = ((dstLat - srcLat) * Math.PI) / 180;
  const deltaLng = ((dstLng - srcLng) * Math.PI) / 180;

  // Haversine formula
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters

  return distance;
}

// Asynchronous function to find nearest drivers that match all criteria
async function findNearestDrivers(passenger, drivers) {
  const distancePromises = drivers.map(async (driver) => {
    const dayMatch = driver.daysOfWeek.some((day) =>
      passenger.daysOfWeek.includes(day)
    );
    const dateMatch =
      new Date(driver.date).toDateString() <=
      new Date(passenger.date).toDateString();
    const timeMatch = isTimeWithinRange(driver.time, passenger.time);
    const seatMatch = driver.seats >= passenger.seats;

    if (dayMatch && dateMatch && timeMatch && seatMatch) {
      console.log(
        passenger.fromlanglat.lat,
        passenger.fromlanglat.lng,
        driver.fromlanglat.lat,
        driver.fromlanglat.lng
      );
      const distance = await calcDistance(
        passenger.fromlanglat.lat,
        passenger.fromlanglat.lng,
        driver.fromlanglat.lat,
        driver.fromlanglat.lng
      );
      console.log("distance - ", distance);
      return { driver, distance };
    } else {
      return null;
    }
  });

  const results = await Promise.all(distancePromises);
  const validDrivers = results
    .filter((result) => result !== null && result.distance != null)
    .sort((a, b) => a.distance - b.distance);

  return validDrivers.slice(0, 3); // Adjust based on how many drivers you want to return
}

// Async function to match a single passenger with a list of drivers based on the consolidated logic
async function matchPassengerToDrivers(passenger, drivers) {
  const nearestDrivers = await findNearestDrivers(passenger, drivers);
  console.log(nearestDrivers);
  return nearestDrivers.map(({ driver }) => driver._id);
}

export { matchPassengerToDrivers };
