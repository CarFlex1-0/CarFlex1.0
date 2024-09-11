// services/get_lat_long.js
const axios = require('axios');

// Function to get lat/long from OpenStreetMap Nominatim API
async function getLatLongFromOpenStreet(locationName) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        locationName
    )}&format=json&limit=1`;

    try {
        const response = await axios.get(url);
        if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            console.log('response', response)
            return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        } else {
            throw new Error(`No results found for ${locationName}`);
        }
    } catch (error) {
        console.error('Error fetching lat/long:', error);
        throw error;
    }
}

module.exports = getLatLongFromOpenStreet;
