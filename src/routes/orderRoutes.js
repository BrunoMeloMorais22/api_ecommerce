const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const auth = require('../middlewares/auth')

router.post("/pedido", auth, orderController.createOrder)
router.get("/pedidos", auth, orderController.getOrders)

module.exports = router