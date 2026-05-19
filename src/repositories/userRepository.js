const db = require('../config/db')

exports.findByEmail = (email) => {

    return new Promise((resolve, reject) => {

        const sql = "SELECT * FROM usuarios WHERE email = ?"

        db.query(sql, [email], (err, result) => {

            if(err){
                reject(err)
            }

            resolve(result[0])

        })

    })

}

exports.createUser = (data) => {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO usuarios(nome, email, senha, role)
            VALUES (?, ?, ?, ?)
        `

        db.query(
            sql,
            [data.nome, data.email, data.senha, data.role],
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