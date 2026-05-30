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

test('Admin pode cadastrar produtos', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Bruno@2245"
        })

    console.log(loginResponse.body)
    const tokenAdmin = loginResponse.body.data.token

    const response = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Notebook Gamer",
            preco: 5000
        })
    
    expect(response.status).toBe(201)
})


test('Deve alterar produto', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Bruno@2245"
        })

    console.log(loginResponse.body)
    const tokenAdmin = loginResponse.body.data.token
    
    const response = await request(app)
        .put('/routes/produtos/1')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Camisa do Corinthians",
            preco: 6000
        })

    expect(response.status).toBe(200)
})


test('Buscar os produtos', async() => {
    const response = await request(app)
        .get('/routes/produtos')
    
    console.log(response.body)
    expect(response.status).toBe(200)
})