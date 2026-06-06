
const request = require('supertest')
const app = require('../app')
const e = require('express')

test("Deve responder com status 200", async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
})

test('Deve cadastrar usuário', async() => {
    const registerResponse = await request(app)
        .post('/routes/register')
        .send({
            nome: 'Matheus Oliveira',
            email: 'matheus@gmail.com',
            senha: 'Matheus@2245',
        })
    expect(registerResponse.status).toBe(201)
})


