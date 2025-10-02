import prisma from "../config/db.js";

const Location = prisma.location;

class LocationModel {
  async createLocation(data) {
    return await Location.create({ data });
  }

  async getLocationById(id) {
    return await Location.findUnique({ where: { id } });
  }

  async getAllLocationsByUserId(userId) {
    return await Location.findMany({ where: { userId } });
  }

  async getAllLocationsWithCoordinates(latitude, longitude) {
    return await Location.findMany({
      where: { latitude: latitude, longitude: longitude },
    });
  }

  async reverseGeocode(lat, lon) {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.search = new URLSearchParams({
      format: "json",
      lat: lat,
      lon: lon
    }).toString();
    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to fetch location data. Status: ${response.status} ${response.statusText}. Response: ${errorBody}`
      );
    }
    return await response.json();
  }

  async updateLocation(id, data) {
    return await Location.update({ where: { id }, data });
  }

  async deleteLocation(id) {
    return await Location.delete({ where: { id } });
  }
}

export default new LocationModel();
