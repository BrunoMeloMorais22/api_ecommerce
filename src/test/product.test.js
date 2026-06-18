const request = require('supertest')
const app = require('../app')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

let tokenUser
let tokenAdmin

beforeAll(async () => {

    const loginUserResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'guilherme@gmail.com',
            senha: 'Guilherme@2245'
        })

    tokenUser = loginUserResponse.body.data.token

    const loginAdminResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'bruno@gmail.com',
            senha: 'Admin@123'
        })

    tokenAdmin = loginAdminResponse.body.data.token

})

test('Usuário comum não pode cadastrar produto', async() => {
    const response = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            nome: "Notebook Gamer",
            preco: 3500
        })

    expect(response.status).toBe(403)

})

test('Não pode cadastrar produto com preço negativo', async() => {
    const response = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Televisão 4K 82'p",
            preco: -5000,
            estoque: 15
        })
    console.log(response.body)
    expect(response.status).toBe(400)
})

test('Deve deletar um produto', async() => {
    const response = await request(app)
        .delete('/routes/produtos/3')
        .set('Authorization', `Bearer ${tokenAdmin}`)
    
    console.log(response.body)
    expect(response.status).toBe(200)
})

test('Usuário comum não pode deletar um produto', async() => {
    const response = await request(app)
        .delete('/routes/produtos/3')
        .set('Authorization', `Bearer ${tokenUser}`)
    
    console.log(response.body)
    expect(response.status).toBe(403)
})