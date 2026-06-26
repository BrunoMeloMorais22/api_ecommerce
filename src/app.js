const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const errorHandler = require('./middlewares/errorHandler')

const { swaggerUi, specs } = require('./docs/swagger')

require('dotenv').config()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API funcionando'
    })
})


app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use("/routes", userRoutes)
app.use("/routes", productRoutes)
app.use("/routes", cartRoutes)
app.use("/routes", orderRoutes)


app.use(errorHandler)

module.exports = app