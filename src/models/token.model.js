import prisma from "../config/db.js";


class TokenModel {
  async createRefreshToken(userId, token, expiresAt) {
    return await prisma.refreshToken.create({
      data: {
        user_id: userId,
        token,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token) {
    return await prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async deleteRefreshToken(token) {
    return await prisma.refreshToken.delete({
      where: { token },
    });
  }
}

export default new TokenModel();
