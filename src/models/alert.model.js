import prisma from "../config/db.js";
const Alert = prisma.alert;

class AlertModel {
  async getActiveAlertsByUser(userId) {
    return Alert.findMany({
      where: { isActive: true, userId },
      orderBy: { createdAt: "desc" }
    });
  }

  async getAllAlertsByUser(userId) {
    return Alert.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  async createAlert({ type, condition, userId, locationId }) {
    return Alert.create({
      data: {
        type,
        condition,
        isActive: true,
        userId,
        locationId,
      },
    });
  }

  async deactivateAlert(alertId) {
    return Alert.update({
      where: { id: alertId },
      data: { isActive: false }
    });
  }

  async getAlertById(alertId) {
    return Alert.findUnique({
      where: { id: alertId }
    });
  }
}

export default new AlertModel();