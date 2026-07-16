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
        role: "User"
    })

    return {
        message: "Usuário criado",
        id: usuario.id
    }
}

exports.login = async(email, senha) => {

    if(!email || !senha){
        throw new AppError("Preencha todos os campos", 404)
    }

    const usuario = await userRepository.findByEmail(email)

    if(!usuario){
        logger.warn(`Erro no login do usuário ${email}`)
        throw new AppError("Credenciais inválidas", 401)
    }

    const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
    )

    if(!senhaValida){
        throw new AppError("Credenciais inválidas", 401)
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

exports.getUsers = async () => {
    const users = await userRepository.findAll()

    return users.map(user => ({
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role
    }))
}

exports.updateUsers = async (id, userLogado, roleLogado, data) => {
    console.log('id:', id)
    console.log('userLogado:', userLogado)
    console.log('roleLogado:', roleLogado)
    const user = await userRepository.findById(id)

    if (!user) {
        throw new AppError('Usuário não encontrado', 404)
    }

    const isOwner = Number(id) === Number(userLogado)
    const isAdmin = roleLogado === 'Admin'

    if (!isOwner && !isAdmin) {
        throw new AppError('Acesso negado', 403)
    }

    const updateData = {
        nome: data.nome,
        email: data.email
    }

    if (data.senha) {
        updateData.senha = await bcrypt.hash(data.senha, 10)
    }

    return await userRepository.update(id, updateData)
}

exports.deleteUser = async(id) => {
    
    const result = await userRepository.deleteUser(id)

    if(result.affectedRows === 0){
        throw new AppError(
            "Usuário não encontrado",
            404
        )
    }

    return {
        message: "Usuário removido com sucesso",
        usuarioId: id
    }

}