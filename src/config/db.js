const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passport",
    database: "api_ecommerce"
})

db.connect((err) => {
    if (err){
        console.log("Erro ao se conectar:", err)
    }
    else{
        console.log("Conectado ao Banco de Dados")
    }
})

module.exports = db