import LocationModel from '../models/location.model.js';

class LocationService {

    async createLocation(data) {
        return await LocationModel.createLocation(data);
    }

    async reverseGeocode(lat, lon) {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        if (!response.ok) {
            throw new Error('Failed to fetch location data');
        }
        return await response.json();
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