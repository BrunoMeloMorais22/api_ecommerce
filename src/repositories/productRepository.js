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