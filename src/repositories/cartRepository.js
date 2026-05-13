const db = require('../config/db')

exports.addToCart = (
    usuario_id,
    produto_id,
    quantidade
) => {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO carrinho(
                usuario_id,
                produto_id,
                quantidade
            )
            VALUES (?, ?, ?)
        `

        db.query(
            sql,
            [usuario_id, produto_id, quantidade],
            (err, result) => {

                if(err){
                    reject(err)
                }

                resolve(result)

            }
        )

    })

}

exports.getCart = (usuario_id) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT 
                carrinho.id,
                produtos.nome,
                produtos.preco,
                carrinho.quantidade
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