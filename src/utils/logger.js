const isProd = process.env.NODE_ENV === 'production';
const now = () => new Date().toISOString();

const logger ={
    info: (...a) => console.log(`[${now()}] INFO `, ...a),
    error: (...a) => console.error(`[${now()}] ERROR `, ...a),
    warn: (...a) => console.warn(`[${now()}] WARN `, ...a),
    debug: (...a) => isProd ? null : console.debug(`[${now()}] DEBUG `, ...a),
};

module.exports = logger;