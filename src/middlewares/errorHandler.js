const { ZodError } = require('zod')

module.exports = (err, req, res, next) => {

    console.log(err)

    console.log(err instanceof ZodError)

    if(err instanceof ZodError){

        return res.status(400).json({
            errors: err.errors
        })

    }

    return res.status(500).json({
        error: "Erro interno no servidor"
    })

}