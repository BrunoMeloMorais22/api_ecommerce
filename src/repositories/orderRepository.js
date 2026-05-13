const db = require('../config/db')

exports.getCartItems = (usuario_id) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT produtos.preco, carrinho.quantidade
            FROM carrinho
            JOIN produtos
            ON carrinho.produto_id = produtos.id
            WHERE carrinho.usuario_id = ?
        `

        db.query(sql, [usuario_id], (err, result) => {

            if(err){
                reject(err)
            }

            resolve(result)

        })

    })

}

exports.createOrder = (usuario_id, total) => {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO pedidos(usuario_id, total)
            VALUES (?, ?)
        `

        db.query(sql, [usuario_id, total], (err, result) => {

            if(err){
                reject(err)
            }

            resolve({
                id: result.insertId
            })

        })

    })

}

exports.clearCart = (usuario_id) => {

    return new Promise((resolve, reject) => {

        const sql = "DELETE FROM carrinho WHERE usuario_id = ?"

        db.query(sql, [usuario_id], (err, result) => {

            if(err){
                reject(err)
            }

            resolve(result)

        })

    })

}

exports.getOrders = (usuario_id) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT * FROM pedidos
            WHERE usuario_id = ?
        `

        db.query(sql, [usuario_id], (err, result) => {

            if(err){
                reject(err)
            }

            resolve(result)

        })

    })

}