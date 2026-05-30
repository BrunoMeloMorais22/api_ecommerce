

const userService = require('../services/userService')
const { registerSchema } = require('../validators/userValidators')
const { loginSchema } = require('../validators/userValidators')

exports.register = async(req, res, next) => {

    try{

        registerSchema.parse(req.body)

        const { nome, email, senha, role } = req.body

        const result = await userService.register(
            nome,
            email,
            senha,
            role
        )

        res.status(201).json({
        success: true,
        data: result
    })

    } catch(error){
        console.log(error)
        next(error)
    }

}

exports.login = async(req, res, next) => {

    try{

        const { email, senha } = req.body

        const result = await userService.login(
            email,
            senha
        )

        res.status(200).json({
        success: true,
        data: result
    })

    } catch(error){
        next(error)
    }

}