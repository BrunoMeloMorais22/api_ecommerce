const db = require('../config/db')

exports.addToCart = (req, res) => {
    const { produto_id, quantidade } = req.body
    const usuario_id = req.usuarioId

    const sql = `
        INSERT INTO carrinho(usuario_id, produto_id, quantidade)
        VALUES (?, ?, ?)
    `

    db.query(sql, [usuario_id, produto_id, quantidade], (err) => {
        if (err) return res.status(500).json({ erro: "Erro no servidor" })

        return res.json({ mensagem: "Adicionado ao carrinho" })
    })
}

exports.getCart = (req, res) => {
    const usuario_id = req.usuarioId

    const sql = `
        SELECT 
            carrinho.id,
            produtos.nome,
            produtos.preco,
            carrinho.quantidade
        FROM carrinho
        JOIN produtos ON carrinho.produto_id = produtos.id
        WHERE carrinho.usuario_id = ?
    `

    db.query(sql, [usuario_id], (err, result) => {
        if (err) return res.status(500).json({ erro: "Erro no servidor" })

        return res.json(result)
    })
}
