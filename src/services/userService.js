const bcrypt = require('bcrypt')

const userRepository = require('../repositories/userRepository')

exports.register = async(nome, email, senha) => {

    if(!nome || !email || !senha){
        const error = new Error("Preencha todos os campos")
        error.status = 400

        throw error
    }

    const usuarioExiste = await userRepository.findByEmail(email)

    if(usuarioExiste){
        const error = new Error("Email já cadastrado")
        error.status = 400

        throw error
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const usuario = await userRepository.createUser({
        nome,
        email,
        senha: senhaHash
    })

    return {
        mensagem: "Usuário criado",
        id: usuario.id
    }
}

exports.login = async(email, senha) => {

    if(!email || !senha){
        const error = new Error("Preencha todos os campos")
        error.status = 400

        throw error
    }

    const usuario = await userRepository.findByEmail(email)

    if(!usuario){
        const error = new Error("Usuário não encontrado")
        error.status = 404

        throw error
    }

    const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
    )

    if(!senhaValida){
        const error = new Error("Senha inválida")
        error.status = 401

        throw error
    }

    const token = jwt.sign(
        {
            id: usuario.id
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