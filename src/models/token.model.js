import prisma from "../config/db.js";

const refreshToken = prisma.refreshToken;


class TokenModel {

  async createRefreshToken(userId, token, expiresAt) {
    return await refreshToken.create({
      data: {
        user_id: userId,
        token,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token) {
    return await refreshToken.findUnique({
      where: { token },
    });
  }

  async deleteRefreshToken(token) {
    return await refreshToken.delete({
      where: { token },
    });
  }

  async deleteTokensByUserId(userId) {
    return await refreshToken.deleteMany({
      where: { user_id: userId },
    });
  }
  
  async deleteExpiredTokens() {
    const now = new Date();
    return await refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });
  }
}

export default new TokenModel();
