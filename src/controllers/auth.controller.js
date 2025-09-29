import AuthService from "../services/auth.service.js";
import zodValidation from "../utils/zod.schemas.js";
import TokenService from "../services/token.service.js";

class AuthController {
  async register(req, res) {
    try {
      const validateData = zodValidation.registerSchema.parse(req.body);
      const user = await AuthService.register(validateData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const validateData = zodValidation.loginSchema.parse(req.body);
      const user = await AuthService.login(
        validateData.email,
        validateData.password
      );
      const accessToken = await TokenService.generateAccessToken(
        user.id,
        user.email
      );
      const refreshToken = await TokenService.generateRefreshToken(
        user.id,
        user.email
      );
      res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const {token} = req.body;
      const storedToken = await TokenService.findRefreshToken(token);
        if (!storedToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        const tokens = await TokenService.generateTokens(token);
        res.status(200).json(tokens);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token missing" });
      }
      // Validate access token and get user information
      const user = await TokenService.verifyAccessToken(token);
      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }
      // Delete all refresh tokens belonging to the user
      await TokenService.deleteTokensByUserId(user.id);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
