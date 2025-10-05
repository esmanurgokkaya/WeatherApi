import AlertModel from "../models/alert.model.js";
import prisma from "../config/db.js";
import axios from "axios";

const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/onecall";
const API_KEY = process.env.OPENWEATHER_API_KEY;

class AlertService {
  async getUserAlerts(userId) {
    return AlertModel.getActiveAlertsByUser(userId);
  }

  async createCustomAlert({ type, condition, userId, locationId }) {
    return AlertModel.createAlert({ type, condition, userId, locationId });
  }

  async getSevereAlertsForUser(userId) {
    const locations = await prisma.location.findMany({ where: { userId } });
    let allAlerts = [];
    for (const loc of locations) {
      try {
        const response = await axios.get(OPENWEATHER_URL, {
          params: {
            lat: loc.latitude,
            lon: loc.longitude,
            appid: API_KEY,
            units: "metric",
          },
        });
        const alerts = response.data.alerts || [];
        const severeAlerts = alerts.filter(a =>
          ["storm", "flood", "heatwave"].some(severe =>
            a.event.toLowerCase().includes(severe)
          )
        );
        severeAlerts.forEach(a => allAlerts.push({ ...a, location: loc }));
      } catch (error) {
        console.error(
          `Failed to fetch alerts for location (${loc.latitude}, ${loc.longitude}):`,
          error.message || error
        );
        // Optionally, continue to next location
        continue;
      }
    }
    return allAlerts;
  }
}

export default new AlertService();