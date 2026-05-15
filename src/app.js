const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const errorHandler = require('./middlewares/errorHandler')

require('dotenv').config()

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API funcionando'
    })
})

app.use(express.json())


app.use("/routes", userRoutes)
app.use("/routes", productRoutes)
app.use("/routes", cartRoutes)
app.use("/routes", orderRoutes)


app.use(errorHandler)

module.exports = app