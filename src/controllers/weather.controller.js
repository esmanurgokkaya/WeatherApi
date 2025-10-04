import WeatherService from "../services/weather.service.js";

class WeatherController {
    async current(req, res) {
        const lat = req.query.lat || req.query.latitude;
        const lon = req.query.lon || req.query.longitude;
        if (!lat || !lon) {
            return res.status(400).json({ error: "latitude and longitude required" });
        }
        try {
            const data = await WeatherService.getCurrentWeather(lat, lon);
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch current weather' });
        }   
    }

    async hourly(req, res ) {
        const lat = req.query.lat || req.query.latitude;
        const lon = req.query.lon || req.query.longitude;
        if (!lat || !lon) {
            return res.status(400).json({ error: "latitude and longitude required" });
        }
        try {
            const data = await WeatherService.getHourlyForecast(lat, lon);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch hourly forecast' });
        }
    }

    async daily(req, res) {
        const lat = req.query.lat || req.query.latitude;
        const lon = req.query.lon || req.query.longitude;
        if (!lat || !lon) {
            return res.status(400).json({ error: "latitude and longitude required" });
        }
        try {
            const data = await WeatherService.getDailyForecast(lat, lon);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch daily forecast' });
        }
    }

}

export default new WeatherController();