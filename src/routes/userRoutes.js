const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const limiter = require('../middlewares/rateLimiter')

console.log(userController)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt_token_aqui
 *       401:
 *         description: Email ou senha inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", limiter, userController.login)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cadastro de usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bruno Melo
 *               email:
 *                 type: string
 *                 example: bruno@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário cadastrado com sucesso
 *                 usuario:
 *                   type: object
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/register", userController.register)

module.exports = router