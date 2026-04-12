const db = require('../config/db')

exports.createOrder = (req, res) => {
    const usuario_id = req.usuarioId

    const sqlCarrinho = `
        SELECT produtos.preco, carrinho.quantidade
        FROM carrinho
        JOIN produtos ON carrinho.produto_id = produtos.id
        WHERE carrinho.usuario_id = ?
    `

    db.query(sqlCarrinho, [usuario_id], (err, result) => {

        if (result.length === 0) {
            return res.status(400).json({ erro: "Carrinho vazio" })
        }

        const total = result.reduce((acc, item) => {
            return acc + (item.preco * item.quantidade)
        }, 0)

        const sqlPedido = "INSERT INTO pedidos(usuario_id, total) VALUES(?, ?)"

        db.query(sqlPedido, [usuario_id, total], (err, pedidoResult) => {

            db.query("DELETE FROM carrinho WHERE usuario_id = ?", [usuario_id])

            return res.status(201).json({
                mensagem: "Pedido criado",
                pedido_id: pedidoResult.insertId,
                total
            })
        })
    })
}

exports.getOrders = (req, res) => {
    const usuario_id = req.usuarioId

    db.query("SELECT * FROM pedidos WHERE usuario_id = ?", [usuario_id], (err, result) => {
        return res.json(result)
    })
}