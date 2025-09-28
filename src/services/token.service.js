import TokenModel from "../models/token.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ms from "ms";
dotenv.config();
// decode işlemini  burda yapabilir miyiz?

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
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }

  async generateRefreshToken(userId, userEmail) {
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
    const refreshToken = jwt.sign(
      { userId, userEmail },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn }
    );
    // Calculate expiresAt
    const expiresAt = new Date(Date.now() + ms(expiresIn));
    await TokenModel.createRefreshToken(userId, refreshToken, expiresAt);
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
