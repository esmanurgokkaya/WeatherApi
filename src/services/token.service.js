import TokenModel from "../models/token.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class TokenService {
  async generateAccessToken(userId, userEmail) {
    const accessToken = jwt.sign(
      { userId, userEmail },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    return accessToken;
  }

  async verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired access token");
    }
  }

  async verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }

  async generateRefreshToken(userId, userEmail) {
    const refreshToken = jwt.sign(
      { userId, userEmail },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );
    await TokenModel.createRefreshToken(userId, refreshToken);
    return refreshToken;
  }

  async findRefreshToken(token) {
    return await TokenModel.findRefreshToken(token);
  }

  async deleteRefreshToken(token) {
    return await TokenModel.deleteRefreshToken(token);
  }
}

export default new TokenService();
