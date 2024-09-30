const OpenAI = require("openai");
const User = require ("../models/user");
const Chat = require("../models/chat");
const axios = require('axios');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate random values for temperature and humidity based on Pakistan's average weather
const getRandomWeather = () => {
    const randomTemp = Math.floor(Math.random() * (35 - 20 + 1)) + 20; // Random temperature between 20°C and 35°C
    const randomHumidity = Math.floor(Math.random() * (80 - 50 + 1)) + 50; // Random humidity between 50% and 80%
    return {
        avgtemp_c: randomTemp,
        avghumidity: randomHumidity
    };
};

const getAverageWeather = async (location1, location2, date) => {
    try {
        // Fetch weather for the first location
        let forecast1;
        try {
            const weatherResponse1 = await axios.get(`http://api.weatherapi.com/v1/future.json?key=${process.env.WEATHER_API_KEY}&q=${location1}&dt=${date}`);
            forecast1 = weatherResponse1.data.forecast.forecastday[0].day;
        } catch (error) {
            console.warn(`Failed to fetch weather for ${location1}, using random weather data.`);
            forecast1 = getRandomWeather();
        }

        // Introduce a delay before the second API call
        await delay(200); // 200ms delay (you can adjust the delay duration)

        // Fetch weather for the second location
        let forecast2;
        try {
            const weatherResponse2 = await axios.get(`http://api.weatherapi.com/v1/future.json?key=${process.env.WEATHER_API_KEY}&q=${location2}&dt=${date}`);
            forecast2 = weatherResponse2.data.forecast.forecastday[0].day;
        } catch (error) {
            console.warn(`Failed to fetch weather for ${location2}, using random weather data.`);
            forecast2 = getRandomWeather();
        }

        // Calculate the average of avgtemp_c and avghumidity
        const avgTemp = (forecast1.avgtemp_c + forecast2.avgtemp_c) / 2;
        const avgHumidity = (forecast1.avghumidity + forecast2.avghumidity) / 2;

        // Return the averages
        return {
            avgTemp,
            avgHumidity
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch weather data");
    }
};

const getResponseFromModel = async (req, res) => {
    try {
        const { userId, chatTitle, startLocation,
            endLocation,
            travelDate, carName } = req.body;
        const { avgTemp, avgHumidity } = await getAverageWeather(startLocation, endLocation, travelDate);
        const prompt = `I am embarking on a road trip from ${startLocation} to ${endLocation} in my ${carName}. Provide a detailed and thorough analysis of the mechanical upgrades or enhancements I should consider for my vehicle to ensure optimal performance and safety throughout the journey. Include an in-depth breakdown of the terrain, potential hazards, and best traffic routes between these cities. Also, analyze the weather conditions along the route, specifically focusing on how the average humidity of ${avgHumidity}% and temperature of ${avgTemp}°C on ${travelDate} could impact the vehicle and driver health. Respond **ONLY STRICTLY** in the following JSON format: {"carEnhancements": "Comprehensive recommendations for mechanical upgrades or checks", "terrainAnalysis": "In-depth analysis of terrain, traffic routes, total distance in km and miles ,and potential driving challenges", "weatherConditions": "Detailed summary of expected weather and its effects on vehicle and driver health"} with no extra text outside of the JSON format.`;


            
        // Make the API call to OpenAI
        const response = await openai.chat.completions.create({
            model: "ft:gpt-3.5-turbo-0125:personal:carflex-v1-0:ABW31SvM",
            messages: [
                {
                    role: "user",
                    content: prompt, // Directly use the prompt as a string
                },
            ],
            temperature: 1,
            max_tokens: 700,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        // Extract the content from the response
        const completion = await response.choices[0].message.content;
        let modelResponse;
        try {
            modelResponse = JSON.parse(completion);
        } catch (parseError) {
            console.error("Failed to parse the model response as JSON:", parseError);
            return res.status(500).json({ error: "Model response is not valid JSON" });
        }

        const { carEnhancements, terrainAnalysis, weatherConditions } = modelResponse;

        const chat = await Chat.create({
            user: userId,
            prompt,
            response: {
                carEnhancements,
                terrainAnalysis,
                weatherConditions
            }, 
            title: chatTitle,
            modelUsed: "ft:gpt-3.5-turbo-0125:personal:carflex-v1-0:ABW31SvM"
        })
        await User.findByIdAndUpdate(
            userId,
                {$push: { chatHistory : chat._id }
            }
        )
        // Return the response to the client in the required format
        res.status(200).json({
            carEnhancements,
            terrainAnalysis,
            weatherConditions,chat
        });
    } catch (error) {
        console.error("Error fetching response from model:", error);
        res.status(500).json({ error: "Failed to get response from the model" });
    }
};
const getChatSpecificUser = (async(req, res)=>{
    try{
        const { userId } = req.body;
        const user = await User.findById(userId).populate('chatHistory');
        const chats = user.chatHistory;
        res.status(200).json(chats);
    }catch(error){
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to get chat history" });
    }
})
const getWeather = (async(req, res)=>{
    try{
        const { location } = req.body;
        const response = await axios.get(`http://api.weatherapi.com/v1/future.json?key=${process.env.WEATHER_API_KEY}&q=${location}&dt=2024-10-28`);
        const forecast = response.data.forecast.forecastday[0].day; // Getting the forecast for the specific date

        const safeWeatherData = {
            avgtemp_c: forecast.avgtemp_c,
            avghumidity: forecast.avghumidity,
            condition: forecast.condition.text,  // Additional weather condition field
            maxtemp_c: forecast.maxtemp_c,       // Maximum temperature
            mintemp_c: forecast.mintemp_c,       // Minimum temperature
            maxwind_kph: forecast.maxwind_kph,   // Maximum wind speed
        };
        res.status(200).json(safeWeatherData);
    }catch(error){
        console.error("Error fetching weather:", error);
        res.status(500).json("Server Error")
    }
})
module.exports = { getResponseFromModel, getChatSpecificUser, getWeather };
