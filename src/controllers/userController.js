

const userService = require('../services/userService')
const { registerSchema } = require('../validators/userValidators')
const { loginSchema } = require('../validators/userValidators')
const logger = require('../config/logger')
const { success } = require('zod')
const { tr } = require('zod/v4/locales')

exports.register = async(req, res, next) => {

    logger.info('Tentativa de cadastro iniciada')

    try{

        registerSchema.parse(req.body)

        const { nome, email, senha } = req.body

        const role = "User"

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

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers()

        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error)
    }
}

exports.updateUsers = async (req, res, next) => {
    logger.info('Tentativa de alteração de usuário iniciada')

    try {
        const { id } = req.params
        const userLogado = req.user.id
        const roleLogado = req.user.role

        const result = await userService.updateUsers(
            Number(id),
            Number(userLogado),
            roleLogado,
            req.body
        )

        logger.info('Usuário atualizado com sucesso')

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        logger.error('Erro ao atualizar usuário')
        next(error)
    }
}