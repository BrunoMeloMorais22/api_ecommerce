

const userService = require('../services/userService')
const { registerSchema } = require('../validators/userValidators')
const { loginSchema } = require('../validators/userValidators')
const logger = require('../config/logger')

exports.register = async(req, res, next) => {

    logger.info('Tentativa de cadastro iniciada')

    try{

        registerSchema.parse(req.body)

        const { nome, email, senha, role } = req.body

        const result = await userService.register(
            nome,
            email,
            senha,
            role
        )

        logger.info('Usuário cadastrado com sucesso')

        res.status(201).json({
        success: true,
        data: result
    })

    } catch(error){
        logger.error('Erro ao cadastrar usuário')
        next(error)
    }

}

exports.login = async(req, res, next) => {
    logger.info('Tentativa de login iniciada')

    try{

        const { email, senha } = req.body

        const result = await userService.login(
            email,
            senha
        )

        logger.info('Login realizado com sucesso')

        res.status(200).json({
        success: true,
        data: result
    })

    } catch(error){
        logger.error('Erro ao fazer login')
        next(error)
    }

}