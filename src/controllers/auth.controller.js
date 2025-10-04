import AuthService from "../services/auth.service.js";
import zodValidation from "../utils/zod.schemas.js";
import TokenService from "../services/token.service.js";
import { success, error, formatZodErrors } from "../utils/api.response.js";

class AuthController {
  async register(req, res, next) {
    try {
      const validateData = zodValidation.registerSchema.parse(req.body);
      const user = await AuthService.register(validateData);
      res.status(201).json(success("User registered successfully", user));
    } catch (err) {
      if (err.name === "ZodError") {
        return res.status(400).json(error("Validation error", formatZodErrors(err)));
      }
      next(err); // AppError ise error middleware'e gider
    }
  }

  async login(req, res, next) {
    try {
      const validateData = zodValidation.loginSchema.parse(req.body);
      const user = await AuthService.login(validateData.email, validateData.password);
      const accessToken = await TokenService.generateAccessToken(user.id, user.email);
      const refreshToken = await TokenService.generateRefreshToken(user.id, user.email);
      res.status(200).json(success("Login successful", { user, accessToken, refreshToken }));
    } catch (err) {
      if (err.name === "ZodError") {
        return res.status(400).json(error("Validation error", formatZodErrors(err)));
      }
      next(err);
    }
  }

  async refreshToken(req, res) {
    try {
      const { token } = req.body;
      const storedToken = await TokenService.findRefreshToken(token);
      if (!storedToken) {
        return res.status(401).json(error("Invalid refresh token", { token }));
      }
      const tokens = await TokenService.generateTokens(token);
      res.status(200).json(success("Token refreshed successfully", tokens));
    } catch (err) {
      if (err.name === "ZodError") {
        return res
          .status(400)
          .json(error("Validation error", formatZodErrors(err)));
      }
      res
        .status(400)
        .json(
          error("Token refresh failed: " + err.message, err.errors || null)
        );
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json(error("Token missing in Authorization header"));
      }
      const user = await TokenService.verifyAccessToken(token);
      if (!user) {
        return res.status(401).json(error("Invalid access token"));
      }
      await TokenService.deleteTokensByUserId(user.id);
      res.status(200).json(success("Logged out successfully"));
    } catch (err) {
      if (err.name === "ZodError") {
        return res
          .status(400)
          .json(error("Validation error", formatZodErrors(err)));
      }
      res
        .status(500)
        .json(error("Logout failed: " + err.message, err.errors || null));
    }
  }
}

export default new AuthController();
