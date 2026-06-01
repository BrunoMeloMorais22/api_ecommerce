const bcrypt = require('bcrypt')

const userRepository = require('../repositories/userRepository')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError.js')
const logger = require('../config/logger.js')

exports.register = async(nome, email, senha, role) => {

    const usuarioExiste = await userRepository.findByEmail(email)

    if(usuarioExiste){
        logger.warn(`Tentativa de cadastro com email já existente ${email}`)
        throw new AppError("Usuário já existe", 400)
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const usuario = await userRepository.createUser({
        nome,
        email,
        senha: senhaHash,
        role
    })

    return {
        mensagem: "Usuário criado",
        id: usuario.id
    }
}

exports.login = async(email, senha) => {

    if(!email || !senha){
        throw new AppError("Preencha todos os campos", 404)
    }

    const usuario = await userRepository.findByEmail(email)

    if(!usuario){
        throw new AppError("Usuário não encontrado", 400)

        logger.warn(`Erro no login do usuário ${email}`)
    }

    const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
    )

    if(!senhaValida){
        throw new AppError("Senha inválida", 401)
        
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            role: usuario.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )

    return {
        message: "Login realizado com sucesso",
        token
    }

}