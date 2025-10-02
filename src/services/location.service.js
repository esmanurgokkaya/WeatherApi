import LocationModel from "../models/location.model.js";

class LocationService {
  async createLocation(data) {
    const location = await LocationModel.getAllLocationsWithCoordinates(
      data.latitude,
      data.longitude
    );
    if (location.length > 0) {
      throw new Error("Location with the same coordinates already exists");
    }
    return await LocationModel.createLocation(data);
  }

  async reverseGeocode(lat, lon) {
    return await LocationModel.reverseGeocode(lat, lon);
  }

  async getLocationById(id) {
    return await LocationModel.getLocationById(id);
  }

  async getAllLocationsByUserId(userId) {
    return await LocationModel.getAllLocationsByUserId(userId);
  }

  async updateLocation(id, data) {
    return await LocationModel.updateLocation(id, data);
  }

  async deleteLocation(id) {
    return await LocationModel.deleteLocation(id);
  }
}

export default new LocationService();
