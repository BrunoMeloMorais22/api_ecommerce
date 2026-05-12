const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')


/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Notebook Gamer
 *               preco:
 *                 type: number
 *                 example: 4500.99
 *               descricao:
 *                 type: string
 *                 example: Notebook com RTX 4060
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto criado com sucesso
 *                 produto:
 *                   type: object
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/produtos", productController.createProduct)

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produtos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: Notebook Gamer
 *                       preco:
 *                         type: number
 *                         example: 4500.99
 *                       descricao:
 *                         type: string
 *                         example: Notebook com RTX 4060
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/produtos", productController.getProducts)

module.exports = router