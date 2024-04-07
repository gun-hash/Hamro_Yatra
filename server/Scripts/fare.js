// Function to calculate the distance between two coordinates 
function calcDistance(srcLat, srcLng, dstLat, dstLng) {
    // Convert each parameter to a string and truncate to 16 characters if necessary
    srcLat = parseFloat(srcLat);
    srcLng = parseFloat(srcLng);
    dstLat = parseFloat(dstLat);
    dstLng = parseFloat(dstLng);
    // Earth radius in meters
    const R = 6371000;

    // Convert latitude and longitude from degrees to radians
    const lat1 = srcLat * Math.PI / 180;
    const lat2 = dstLat * Math.PI / 180;
    const deltaLat = (dstLat - srcLat) * Math.PI / 180;
    const deltaLng = (dstLng - srcLng) * Math.PI / 180;

    // Haversine formula
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters

    return distance;
}

function fareCalc(currRide) {
    const distance = calcDistance(currRide.fromlanglat.lat, currRide.fromlanglat.lng,
        currRide.tolanglat.lat, currRide.tolanglat.lng)
    const ratePerKm = 25;
    // Convert distance to kilometers
    const distanceInKm = distanceInMeters / 1000;
    // Calculate initial fare
    let fare = distanceInKm * ratePerKm;
    // Round off to the nearest 5
    fare = Math.round(fare / 5) * 5;
    return fare;
}

export { fareCalc }