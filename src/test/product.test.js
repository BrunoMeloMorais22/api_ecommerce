const request = require('supertest')
const app = require('../app')
const e = require('express')

test('Deve cadastrar produto', async() => {
    const response = await request(app)
        .post('/routes/produtos')
        .send({
            nome: "Camiseta do Corinthians",
            preco: 100.00
        })
    
        expect(response.status).toBe(201)
})

test('Deve pegar produtos cadastrados', async() => {
    const response = await request(app)
        .get('/routes/produtos')
    
    expect(response.status).toBe(200)
})