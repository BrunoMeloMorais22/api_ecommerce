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


test('Buscar produtos cadastrados', async() => {
    const produtosResponse = await request(app)
        .get('/routes/produtos')
    
    expect(produtosResponse.status).toBe(200)
})

