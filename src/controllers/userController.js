const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 30 * 1000,
    max: 10,
    message: "Muitas tentivas. Tente novamente mais tarde"
})

exports.register = async (req, res, next) => {

    try{
        const { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Preencha todos os campos" })
        }

        const senhaHash = await bcrypt.hash(senha, 10)

        const verifica = "SELECT * FROM usuarios WHERE email = ?"

        db.query(verifica, [email], (err, result) => {
            if (result.length > 0) {
                return res.status(400).json({ erro: "Email já cadastrado" })
            }

        const insert = "INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)"

        db.query(insert, [nome, email, senhaHash], (err, result) => {
            if (err) return res.status(500).json({ erro: "Erro no servidor" })

            return res.status(201).json({
                mensagem: "Usuário criado",
                id: result.insertId
            })
        })
    })
    }
    catch(error){
        next(error)
    }
}

exports.login = (req, res, next) => {

    try{
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({ erro: "Preencha todos os campos" })
        }

        db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
        
        if (result.length === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" })
        }

        const usuario = result[0]

        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return res.status(401).json({ erro: "Senha inválida" })
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET
        )

        return res.json({ token })
    })
    }
    catch(error){
        next(error)
    }
}

exports.limiter = limiter