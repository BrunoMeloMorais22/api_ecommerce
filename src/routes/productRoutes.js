const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authorize = require('../middlewares/authorize')
const auth = require('../middlewares/auth')
const upload = require("../config/upload");


/**
 * @swagger
 * /routes/produtos:
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
router.post("/produtos", upload.single("imagem"), auth, authorize('Admin'), productController.createProduct)

/**
 * @swagger
 * /routes/produtos:
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

/**
 * @swagger
 * /routes/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     description: Atualiza os dados de um produto existente (apenas Admin)
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Tênis Nike Air"
 *               descricao:
 *                 type: string
 *                 example: "Tênis confortável para corrida"
 *               preco:
 *                 type: number
 *                 example: 299.99
 *               quantidade:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente Admin)
 *       404:
 *         description: Produto não encontrado
 */
router.put('/produtos/:id',auth,authorize('Admin'),productController.updateProduct)


/**
 * @swagger
 * /routes/produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     description: Deleta um produto do sistema (apenas Admin)
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente Admin)
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/produtos/:id',auth,authorize('Admin'),productController.deleteProduct)

module.exports = router