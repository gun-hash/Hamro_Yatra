// Function to calculate distance between two coordinates
async function calcDistance(srcLat, srcLng, dstLat, dstLng) {
    accessToken = ' 2d858743-50e4-43a9-9b0a-e4b6a5933b5d'
    const url = `https://route-init.gallimap.com/api/v1/routing/distance?mode=${'driving'}&srcLat=${srcLat}&srcLng=${srcLng}&dstLat=${dstLat}&dstLng=${dstLng}&accessToken=${accessToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            return data.distance; // Assuming the API response contains a field named "distance"
        } else {
            throw new Error(data.message); // Throw error if API request fails
        }
    } catch (error) {
        console.error('Error fetching distance:', error.message);
        return null; // Return null if there's an error
    }
}

// Function to find nearest drivers for a single passenger
function findNearestDrivers(passenger, drivers) {
    const validDrivers = drivers.filter(driver =>
        driver.days_of_week.some(day => passenger.days_of_week.includes(day)) && // Check if days of week match
        driver.travel_time === passenger.travel_time // Check if travel time matches
    );

    const distances = [];
    for (const driver of validDrivers) {
        const distance = calcDistance(passenger.from_latitude, passenger.from_longitude, driver.from_latitude, driver.from_longitude);
        distances.push({ driver, distance });
    }
    distances.sort((a, b) => a.distance - b.distance); // Sort distances in ascending order
    return distances.slice(0, 3); // Return k nearest drivers
}

// Function to match a single passenger with a list of drivers
function matchPassengerToDrivers(passenger, drivers) {
    const nearestDrivers = findNearestDrivers(passenger, drivers);
    const matchedDrivers = nearestDrivers.filter(({ driver }) =>
        driver.days_of_week.some(day => passenger.days_of_week.includes(day)) && // Check if days of week match
        driver.travel_time === passenger.travel_time // Check if travel time matches
    ).map(({ driver }) => driver.id);
    return matchedDrivers;
}


// Export functions

export { matchPassengerToDrivers }
