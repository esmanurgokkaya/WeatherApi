import LocationService from '../services/location.service.js';
import tokenService from "../services/token.service.js";
import ZodValidation from '../utils/zod.schemas.js';
import { success, error, formatZodErrors } from "../utils/api.response.js";
class LocationController {

    async createLocation(req, res) {
        try {
            const validateData = ZodValidation.createLocationSchema.parse(req.body);
            const location = await LocationService.createLocation(validateData);
            res.status(201).json(success("Location created successfully", location));
        } catch (err) {
            if (err.name === "ZodError") {
                return res
                    .status(400)
                    .json(error("Validation error", formatZodErrors(err)));
            }
            // Handle other server errors
            return res.status(500).json(error("Failed to create location", err));
        }
    }

    async getLocationById(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
            return res.status(401).json(error("Authorization token is missing"));
            }
    
            const decoded = await tokenService.verifyAccessToken(token);
            const id = decoded.userId;
            const locationId = req.params.id;

            const location = await LocationService.getLocationById(locationId);
            if (!location) {
                return res.status(404).json(error("Location not found"));
                }

            res.status(200).json(success("Location retrieved successfully", location));
        } catch (err) {
            return res.status(500).json(error("Failed to retrieve location", err));
        }
    }

    async getAllLocationsByUserId(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
            return res.status(401).json(error("Authorization token is missing"));
            }
    
            const decoded = await tokenService.verifyAccessToken(token);
            const id = decoded.userId;
            const locations = await LocationService.getAllLocationsByUserId(id);
            res.status(200).json(success("Locations retrieved successfully", locations));
        } catch (err) {
            return res.status(500).json(error("Failed to retrieve locations", err));
        }
    }

    async updateLocation(req, res) {
        try {
            const locationId = req.params.id;
            const updateData = ZodValidation.updateLocationSchema.parse(req.body);
            const updatedLocation = await LocationService.updateLocation(locationId, updateData);
            res.status(200).json(success("Location updated successfully", updatedLocation));
        } catch (err) {
            if (err.name === "ZodError") {
                return res
                    .status(400)
                    .json(error("Validation error", formatZodErrors(err)));
            }
            // Handle other server errors
            return res.status(500).json(error("Failed to update location", err));
        }   
    }

    async deleteLocation(req, res) {
        try {
            const locationId = req.params.id;
            await LocationService.deleteLocation(locationId);
            res.status(200).json(success("Location deleted successfully"));
        } catch (err) {
            return res.status(500).json(error("Failed to delete location", err));
        }
    }
}

export default new LocationController();