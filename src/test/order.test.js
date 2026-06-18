const request = require('supertest')
const app = require('../app')
const { login } = require('../services/userService')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
let tokenUser
let tokenAdmin

beforeAll(async() => {
    const loginUserResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "matheus@gmail.com",
            senha: "Matheus@2245"
        })  
    
    tokenUser = loginUserResponse.body.data.token

    const loginAdminResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Admin@123"
        })
    
    tokenAdmin = loginAdminResponse.body.data.token
})

describe('Pedidos', () => {
    beforeEach(async () => {
    
        await prisma.carrinho.create({
            data:{
                usuarioId: 2,
                produtoId: 2,
                quantidade: 4
            }
        })
    })

    afterEach(async () => {
        await prisma.carrinho.deleteMany({
            where: {
                usuarioId: 2
            }
        })
    })
    test('Deve criar pedido', async() => {
    const response = await request(app)
        .post('/routes/pedido')
        .set('Authorization', `Bearer ${tokenUser}`)
    console.log(response.body)
    expect(response.status).toBe(201)
})
})