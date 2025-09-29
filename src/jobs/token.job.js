import TokenModel from "../models/token.model.js";

export async function cleanupExpiredTokens() {
  await TokenModel.deleteExpiredTokens();
}
