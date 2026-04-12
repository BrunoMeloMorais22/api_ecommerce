const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use(express.json())

app.use("/routes", userRoutes)
app.use("/routes", productRoutes)
app.use("/routes", cartRoutes)
app.use("/routes", orderRoutes)

module.exports = app