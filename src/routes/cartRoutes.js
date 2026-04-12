const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const auth = require('../middlewares/auth')

router.post("/carrinho", auth, cartController.addToCart)
router.get("/carrinho", auth, cartController.getCart)


module.exports = router