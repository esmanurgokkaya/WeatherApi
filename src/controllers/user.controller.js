import userService from "../services/user.service.js";
import tokenService from "../services/token.service.js";
import zodValidation from "../utils/zod.schemas.js";
import { success, error, formatZodErrors } from "../utils/api.response.js";

class UserController {
  async getUserById(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json(error("Authorization token is missing"));
      }

      const decoded = await tokenService.verifyAccessToken(token);
      const id = decoded.userId;

      const user = await userService.getUserProfile(id);
      res.status(200).json(success("User profile fetched successfully", user));
    } catch (err) {
      res
        .status(401)
        .json(
          error(
            "Failed to fetch user profile: " + err.message,
            err.errors || null
          )
        );
    }
  }

  async updateUser(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json(error("Authorization token is missing"));
      }
      const decoded = await tokenService.verifyAccessToken(token);
      const id = decoded.userId;
      const validateData = zodValidation.updateUserSchema.parse(req.body);
      const updatedUser = await userService.updateUser(id, validateData);
      res.status(200).json(success("User updated successfully", updatedUser));
    } catch (err) {
      if (err.name === "ZodError") {
        return res
          .status(400)
          .json(error("Validation error", formatZodErrors(err)));
      }
      res
        .status(400)
        .json(
          error("Failed to update user: " + err.message, err.errors || null)
        );
    }
  }

  async updatePassword(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json(error("Authorization token is missing"));
      }
      const decoded = await tokenService.verifyAccessToken(token);
      const id = decoded.userId;
      const validateData = zodValidation.updatePasswordSchema.parse(req.body);
      await userService.updatePassword(
        id,
        validateData.oldPassword,
        validateData.newPassword
      );
      res.status(200).json(success("Password updated successfully"));
    } catch (err) {
      if (err.name === "ZodError") {
        return res
          .status(400)
          .json(error("Validation error", formatZodErrors(err)));
      }
      res
        .status(400)
        .json(
          error("Failed to update password: " + err.message, err.errors || null)
        );
    }
  }

  async deleteUser(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json(error("Authorization token is missing"));
      }
      const decoded = await tokenService.verifyAccessToken(token);
      const id = decoded.userId;
      await userService.deleteUser(id);
      res.status(200).json(success("User deleted successfully"));
    } catch (err) {
      res
        .status(400)
        .json(
          error("Failed to delete user: " + err.message, err.errors || null)
        );
    }
  }
}

export default new UserController();
