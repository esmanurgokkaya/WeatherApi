// src/server.js
import app from './app.js';
import loadEnv  from './utils/env.js';

const { PORT } = loadEnv();

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Health: http://localhost:${PORT}/health`);
});
