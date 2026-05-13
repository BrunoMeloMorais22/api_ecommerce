const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Muitas requisições, tente novamente depois"
})

module.exports = limiter