const request = require('supertest')
const app = require('../app')
const e = require('express')
const { login } = require('../services/userService')

test('Usuário comum não pode cadastrar produto', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'matheus@gmail.com',
            senha: 'Matheus@2245'
        })
    
    const tokenUser = loginResponse.body.data.token
    const response = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            nome: "Notebook Gamer",
            preco: 3500
        })
    expect(response.status).toBe(403)
})


test('Admin pode cadastrar produtos', async () => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Admin@123"
        })
    const tokenUser = loginResponse.body.data.token
    const produtoResponse = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            nome: "Camisa do Corinthians All Black",
            preco: 250,
            estoque: 2
        })
    
    expect(produtoResponse.status).toBe(201)
})

test('Deve adicionar o produto ao carrinho', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "matheus@gmail.com",
            senha: "Matheus@2245"
        })
    
    const tokenUser = loginResponse.body.data.token
    console.log(loginResponse.body)
    
    const carrinhoResponse = await request(app)
        .post('/routes/carrinho')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            produtoId: 1,
            quantidade: 5
        })
    
    expect(carrinhoResponse.status).toBe(200)
})