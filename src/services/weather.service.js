import axios from "axios";

const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.OPENWEATHER_API_KEY;

class WeatherService {
    static async getCurrentWeather(lat, lon) {
        const response = await axios.get(`${OPENWEATHER_URL}/weather`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: "metric",
            },
        });
        const data = response.data;
        return {
            location: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            weather: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
        };
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