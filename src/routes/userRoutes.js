const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const limiter = require('../middlewares/rateLimiter')
const authorize = require('../middlewares/authorize')
const authMiddleware = require('../middlewares/auth')

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

/**
 * @swagger
 * /routes/users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna todos os usuários cadastrados (apenas Admin)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente Admin)
 */
router.get('/users', authMiddleware, authorize('Admin'), userController.getUsers)

/**
 * @swagger
 * /routes/users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza dados de um usuário específico (apenas Admin)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente Admin)
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/users/:id', authMiddleware, authorize('Admin'), userController.updateUsers)


/**
 * @swagger
 * /routes/users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     description: Deleta um usuário específico (apenas Admin)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente Admin)
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/users/:id', authMiddleware, authorize('Admin'), userController.deleteUser)

module.exports = router