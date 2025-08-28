const dotenv = require('dotenv');

function loadEnv() {
    dotenv.config();
    const required = ['JWT_SECRET', 'DB_URI', 'PORT'];
    const missing = required.filter(key => !process.env[key]);
    if (missing.length) {
        console.error(`Missing required env vars: ${missing.join(', ')}`);
        process.exit(1);
    }
    return{
        NODE_ENV: process.env.NODE_ENV || 'development',
        JWT_SECRET: process.env.JWT_SECRET,
        DB_URI: process.env.DB_URI,
        PORT: process.env.PORT || 3000,
    };
}

module.exports = loadEnv;