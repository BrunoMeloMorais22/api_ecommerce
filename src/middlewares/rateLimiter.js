const rateLimit = require('express-rate-limit')

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 2,

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {

        console.log('Bloqueado')

        return res.status(429).json({
            error: 'Muitas tentativas'
        })

    }

})

module.exports = limiter