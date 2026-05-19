const db = require('../config/db')

exports.createProduct = (data) => {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO produtos(nome, preco)
            VALUES (?, ?)
        `

        db.query(
            sql,
            [data.nome, data.preco],
            (err, result) => {

                if(err){
                    reject(err)
                }

                resolve({
                    id: result.insertId
                })

            }
        )

    })

}

exports.getProducts = () => {

    return new Promise((resolve, reject) => {

        const sql = "SELECT * FROM produtos"

        db.query(sql, (err, result) => {

            if(err){
                reject(err)
            }

            resolve(result)

        })

    })

}

exports.updateProduct = (id, nome, preco) => {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE produtos
            SET nome = ?, preco = ?
            WHERE id = ?
        `

        db.query(sql, [nome, preco, id], (err, result) => {

            if(err){
                return reject(err)
            }

            resolve(result)

        })

    })

}

exports.deleteProduct = (id) => {

    return new Promise((resolve, reject) => {

        const sql = `
            DELETE FROM produtos
            WHERE id = ?
        `

        db.query(sql, [id], (err, result) => {

            if(err){
                return reject(err)
            }

            resolve(result)

        })

    })

}