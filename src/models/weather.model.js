import prisma from '../config/db.js';

const Weather = prisma.weatherCache;

class WeatherModel {
  async createOrUpdateCache({ locationId, type, data }) {
    // Önce mevcut kaydı bul
    const existing = await Weather.findFirst({
      where: { locationId, type }
    });

    if (existing) {
      // Varsa güncelle
      return Weather.update({
        where: { id: existing.id },
        data: { data, fetchedAt: new Date() }
      });
    } else {
      // Yoksa oluştur
      return Weather.create({
        data: { locationId, type, data, fetchedAt: new Date() }
      });
    }
  }

  async getCache({ locationId, type }) {
    return Weather.findFirst({
      where: { locationId, type }
    });
  }
}

export default new WeatherModel();