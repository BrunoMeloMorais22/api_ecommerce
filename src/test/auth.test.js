
const request = require('supertest')
const app = require('../app')
const e = require('express')

test("Deve responder com status 200", async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
})

test('Deve fazer Login', async () => {
    const login = await request(app)
    .post('/routes/login')
    .send({
        email: "bruno@gmail.com",
        senha: "Bruno@2245"
    })

    expect(login.status).toBe(200)
})

