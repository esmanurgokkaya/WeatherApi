import userService from "../services/user.service.js";
import tokenService from "../services/token.service.js";
import zodValidation from "../utils/zod.schemas.js";

class UserController {
    async getUserById(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token missing" });
            }

            const decoded = await tokenService.verifyAccessToken(token);
            const id = decoded.userId;

            const user = await userService.getUserProfile(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token missing" });
            }
            const decoded = await tokenService.verifyAccessToken(token);
            const id = decoded.userId;  
            const validateData = zodValidation.updateUserSchema.parse(req.body);
            const updatedUser = await userService.updateUser(id, validateData);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updatePassword(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token missing" });
            }
            const decoded = await tokenService.verifyAccessToken(token);
            const id = decoded.userId;  
            const validateData = zodValidation.updatePasswordSchema.parse(req.body);
            await userService.updatePassword(id, validateData.oldPassword, validateData.newPassword);
            res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }       
    }

    async deleteUser(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token missing" });
            }
            const decoded = await tokenService.verifyAccessToken(token);
            const id = decoded.userId;  
            await userService.deleteUser(id);
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new UserController();
