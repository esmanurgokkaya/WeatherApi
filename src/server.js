// src/server.js
const app = require('./app');
const  loadEnv  = require('./utils/env');

const { PORT } = loadEnv();

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
});
