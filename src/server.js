import app from './app.js';
import loadEnv  from './utils/env.js';
import { cleanupExpiredTokens }  from "./jobs/token.job.js";
import cron from "node-cron";
const { PORT } = loadEnv();


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Health: http://localhost:${PORT}/health`);
});
// Uygulama başlatıldığında expired tokenları temizle
cleanupExpiredTokens();

// Her saat başı expired tokenları temizle
cron.schedule("0 * * * *", () => {
  cleanupExpiredTokens();
});
