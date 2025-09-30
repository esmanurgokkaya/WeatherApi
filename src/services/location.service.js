import LocationModel from '../models/location.model.js';

class LocationService {

    async createLocation(data) {
        return await LocationModel.createLocation(data);
    }

    async getLocationById(id) {
        return await LocationModel.getLocationById(id);
    }

    async getAllLocationsByUserId(user_id) {
        return await LocationModel.getAllLocationsByUserId(user_id);
    }

    async updateLocation(id, data) {
        return await LocationModel.updateLocation(id, data);
    }

    async deleteLocation(id) {
        return await LocationModel.deleteLocation(id);
    }

}

export default new LocationService();