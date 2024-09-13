const express = require('express');
const router = express.Router();
const getLatLongFromOpenStreet = require('../services/get_lat_long');
// const Location = require('../models/Location'); // Assuming you have a Location model

// API Route for getting lat/long by location name
router.post('/get-lat-long', async (req, res) => {
    const { location } = req.body;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        // Get lat/long from OpenStreetMap API
        const latLong = await getLatLongFromOpenStreet(location);

        // // Optionally store the result in the database
        // const newLocation = new Location({ name: location, ...latLong });
        // await newLocation.save();

        return res.json(latLong);
    } catch (error) {
        return res.status(500).json({ error: 'Could not fetch location data' });
    }
});

module.exports = router; // Export the router
