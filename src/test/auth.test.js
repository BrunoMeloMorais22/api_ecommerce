
const request = require('supertest')
const app = require('../app')
const e = require('express')
const { email } = require('zod')

test("Deve responder com status 200", async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
})

test('Deve retornar usuário já existente', async() => {
    const registerResponse = await request(app)
        .post('/routes/register')
        .send({
            nome: "Matheus Oliveria",
            email: "Matheus@gmail.com",
            senha: "Matheus@2245"
        })
    
    expect(registerResponse.status).toBe(400)
})

test('Deve dar o erro pra preencher todos os campos', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "matheus@gmail.com",
            senha: ""
        })
    console.log(loginResponse.body)
    expect(loginResponse.status).toBe(400)
})

test('Credenciais erradas', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "matheus@gmail.com",
            senha: "sdnisindis"
        })
    console.log(loginResponse.body)
    expect(loginResponse.status).toBe(401)
})

test('Deve atualizar usuário', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Admin@123"
        })
    console.log("STATUS:", loginResponse.status)
    console.log("BODY:", loginResponse.body)
    const tokenAdmin = loginResponse.body.data.token

    const updateResponse = await request(app)
        .put('/routes/users/1')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Brunão Melo",
            email: "bruno@gmail.com"
        })
    
    expect(updateResponse.status).toBe(200)
})