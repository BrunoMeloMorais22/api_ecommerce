const db = require('../config/db')

exports.createProduct = (req, res, next) => {

    try{
        const { nome, preco } = req.body

        if (!nome || !preco || isNaN(preco) || preco <= 0) {
            return res.status(400).json({ erro: "Dados inválidos" })
        }

        const sql = "INSERT INTO produtos(nome, preco) VALUES(?, ?)"

        db.query(sql, [nome, preco], (err, result) => {
            if (err) return res.status(500).json({ erro: "Erro no servidor" })

            return res.status(201).json({
                mensagem: "Produto criado",
                id: result.insertId
            })
        })
    }
    catch(error){
        next(error)
    }
}

exports.getProducts = (req, res, next) => {

    try{
        db.query("SELECT * FROM produtos", (err, result) => {
        if (err) return res.status(500).json({ erro: "Erro no servidor" })

        return res.json(result)
    })
    }
    catch(error){
        next(error)
    }
}