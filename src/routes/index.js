const { Router } = require('express');
const { ok } = require('../utils/apiResponse');

const router = Router();
router.get('/health', (req, res) => {
  ok(res, {
    status: 'up',
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
