
const request = require('supertest')
const app = require('../app')
const e = require('express')

test("Deve responder com status 200", async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
})

test("Deve cadastrar usuáro", async () => {
    const response = await request(app)
        .post('/routes/register')
        .send({
            nome: "Matheus Campos",
            email: "matheus@gmail.com",
            senha: "Matheus@2245"
        })
    expect(response.status).toBe(201)
})

test('deve bloquear após muitas tentativas', async () => {
    for(let i = 0; i < 2; i++){
        await request(app)
            .post('/routes/login')
            .send({
                email: "bruno@gmail.com",
                senha: "senhaerrada"
            })
    }

    const response = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "senhaerrada"
        })

    console.log(response.status)
    console.log(response.body)
    expect(response.status).toBe(429)
})