const getWeather = async (req, res) => {
    try {
        const { location, date } = req.body;

        // Fetch forecast data for multiple days (max needed range)
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
            params: {
                key: process.env.WEATHER_API_KEY,
                q: location,
                days: 3, // Adjust based on the maximum range of dates you might handle
            },
        });

        // Find the forecast for the requested date
        const forecast = response.data.forecast.forecastday.find(day => day.date === date);

        if (!forecast) {
            return res.status(404).json({ error: "Weather data not found for the specified date" });
        }

        // Extract relevant weather data
        const safeWeatherData = {
            date: forecast.date,
            avgtemp_c: forecast.day.avgtemp_c,
            avghumidity: forecast.day.avghumidity,
            condition: forecast.day.condition.text,  // Additional weather condition field
            maxtemp_c: forecast.day.maxtemp_c,       // Maximum temperature
            mintemp_c: forecast.day.mintemp_c,       // Minimum temperature
            maxwind_kph: forecast.day.maxwind_kph,   // Maximum wind speed
        };

        res.status(200).json(safeWeatherData);
    } catch (error) {
        console.error("Error fetching weather:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};
