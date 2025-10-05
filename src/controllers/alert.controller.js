import AlertService from "../services/alert.service.js";
import tokenService from "../services/token.service.js";
import { success, error } from "../utils/api.response.js";

class AlertController {
  async getUserAlerts(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json(error("Authorization token is missing"));
      }
      const decoded = await tokenService.verifyAccessToken(token);
      const userId = decoded.userId;

      const alerts = await AlertService.getUserAlerts(userId);
      res.status(200).json(success("User alerts retrieved successfully", alerts));
    } catch (err) {
      return res.status(500).json(error("Failed to fetch user alerts", err));
    }
  }

  async createCustomAlert(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json(error("Authorization token is missing"));
      }
      const decoded = await tokenService.verifyAccessToken(token);
      const userId = decoded.userId;

      const { type, condition, locationId } = req.body;
      if (!type || !condition || !locationId) {
        return res.status(400).json(error("Missing required fields"));
      }
      const alert = await AlertService.createCustomAlert({ type, condition, userId, locationId });
      res.status(201).json(success("Custom alert created successfully", alert));
    } catch (err) {
      console.error(err); // Terminalde gerçek hatayı gör
      return res.status(500).json(error("Failed to create alert", err.message || err));
    }
  }

  async getSevereAlerts(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json(error("Authorization token is missing"));
      }
      const decoded = await tokenService.verifyAccessToken(token);
      const userId = decoded.userId;

      const alerts = await AlertService.getSevereAlertsForUser(userId);
      res.status(200).json(success("Severe alerts retrieved successfully", alerts));
    } catch (err) {
      return res.status(500).json(error("Failed to fetch severe alerts", err));
    }
  }
}

export default new AlertController();