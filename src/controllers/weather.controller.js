import WeatherService from "../services/weather.service.js";
import LocationService from "../services/location.service.js";

class WeatherController {
    async current(req, res) {
        const locationId = req.query.locationId;
        if (!locationId) {
            return res.status(400).json({ error: "locationId required" });
        }
        const location = await LocationService.getLocationById(locationId);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        try {
            const data = await WeatherService.getCurrentWeather(location.latitude, location.longitude, locationId);
            res.json(data);
        }
        catch (error) {
            console.error(error); // Hata detayını terminalde gör
            res.status(500).json({ error: 'Failed to fetch current weather', details: error.message });
        }   
    }

    async hourly(req, res ) {
        const locationId = req.query.locationId;
        if (!locationId) {
            return res.status(400).json({ error: "locationId required" });
        }
        const location = await LocationService.getLocationById(locationId);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        try {
            const data = await WeatherService.getHourlyForecast(location.latitude, location.longitude, locationId);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch hourly forecast' });
        }
    }

    async daily(req, res) {
        const locationId = req.query.locationId;
        if (!locationId) {
            return res.status(400).json({ error: "locationId required" });
        }
        const location = await LocationService.getLocationById(locationId);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        try {
            const data = await WeatherService.getDailyForecast(location.latitude, location.longitude, locationId);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch daily forecast' });
        }
    }

}

export default new WeatherController();