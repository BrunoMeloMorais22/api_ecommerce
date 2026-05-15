const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passport',
    database: 'api_ecommerce'
})

function connectDB(){

    db.connect((err) => {

        if(err){
            console.log('Erro ao conectar:', err)
            return
        }

        console.log('Banco conectado')

    })

}

module.exports = {
    db,
    connectDB
}