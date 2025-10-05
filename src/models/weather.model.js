import prisma from "../config/db.js";

const Weather = prisma.weatherCache;

class WeatherModel {
  static async createOrUpdateCache({ locationId, type, data }) {
    const existing = await Weather.findFirst({
      where: { locationId, type },
    });

    if (existing) {
      return Weather.update({
        where: { id: existing.id },
        data: { data, fetchedAt: new Date() },
      });
    } else {
      return Weather.create({
        data: { locationId, type, data, fetchedAt: new Date() },
      });
    }
  }

  async getCache({ locationId, type }) {
    return Weather.findFirst({
      where: { locationId, type },
    });
  }
}

export default new WeatherModel();
