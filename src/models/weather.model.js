import prisma from '../config/db.js';

const Weather = prisma.WeatherCache;

class WeatherModel {

    async createOrUpdateCache({ location, type, data }) {
    return Weather.upsert({
      where: { location_type: { location, type } },
      update: { data, updatedAt: new Date() },
      create: { location, type, data, updatedAt: new Date() },
    });
  }

  async getCache({ location, type }) {
    return Weather.findUnique({
      where: { location_type: { location, type } },
    });
  }
}

export default new WeatherModel();