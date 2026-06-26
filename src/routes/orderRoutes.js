const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const auth = require('../middlewares/auth')

/**
 * @swagger
 * /routes/pedido:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedido criado com sucesso
 *                 pedido:
 *                   type: object
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/pedido", auth, orderController.createOrder)

/**
 * @swagger
 * /routes/pedidos:
 *   get:
 *     summary: Listar pedidos do usuário autenticado
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pedidos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       usuarioId:
 *                         type: integer
 *                         example: 3
 *                       total:
 *                         type: number
 *                         example: 199.90
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/pedidos", auth, orderController.getOrders)

module.exports = router