import axios from "axios";
import WeatherModel from '../models/weather.model.js';

const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.OPENWEATHER_API_KEY;

class WeatherService {
    static async getCurrentWeather(lat, lon, locationId) {
        // Önce cache kontrolü
        const cache = await WeatherModel.getCache({ locationId, type: "current" });
        if (cache) {
            const now = new Date();
            const age = (now - cache.fetchedAt) / 1000;
            if (age < 300) { // 5 dakika
                return cache.data;
            }
        }

        // API'den veri çek
        const response = await axios.get(`${OPENWEATHER_URL}/weather`, {
            params: { lat, lon, appid: API_KEY, units: "metric" },
        });
        const data = {
            location: response.data.name,
            country: response.data.sys.country,
            temperature: response.data.main.temp,
            feels_like: response.data.main.feels_like,
            weather: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
        };

        // Cache'e kaydet
        await WeatherModel.createOrUpdateCache({ locationId, type: "current", data });
        return data;
    }   
    static async getHourlyForecast(lat, lon) {
        const response = await axios.get(`${OPENWEATHER_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: "metric",
            }
        });
        const data = response.data;
        return data.list.map(item => ({
            time: item.dt,
            temperature: item.main.temp,
            weather: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            wind_speed: item.wind.speed,
        }));
    }

    static async getDailyForecast(lat, lon) {
        const response = await axios.get(`${OPENWEATHER_URL}/forecast/daily`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: "metric",
            }
        });
        const data = response.data;
        return data.list.map(item => ({
            date: item.dt,
            temperature: item.temp.day,
            weather: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            humidity: item.humidity,
            wind_speed: item.wind.speed,
        }));
    }

}

export default WeatherService;