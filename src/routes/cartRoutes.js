const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const auth = require('../middlewares/auth')

/**
 * @swagger
 * /carrinho:
 *   post:
 *     summary: Adicionar produto ao carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produtoId:
 *                 type: integer
 *                 example: 1
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Produto adicionado ao carrinho com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto adicionado ao carrinho
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/carrinho", auth, cartController.addToCart)

/**
 * @swagger
 * /carrinho:
 *   get:
 *     summary: Listar itens do carrinho do usuário
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrinho retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 carrinho:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       produtoId:
 *                         type: integer
 *                         example: 5
 *                       quantidade:
 *                         type: integer
 *                         example: 2
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/carrinho", auth, cartController.getCart)


module.exports = router