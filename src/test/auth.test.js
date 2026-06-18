
const request = require('supertest')
const app = require('../app')
const { Prisma } = require('@prisma/client')

let tokenUser
let tokenAdmin

beforeAll(async () => {
    const loginUserResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "matheus@gmail.com",
            senha: "Matheus@2245"
        })
    console.log(loginUserResponse.body)
    tokenUser = loginUserResponse.body.data.token

    const loginAdminResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Admin@123"
        })
    
    tokenAdmin = loginAdminResponse.body.data.token
})

test("Deve responder com status 200", async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
})

test('Deve criar usuário', async() => {
    const registerResponse = await request(app)
        .post('/routes/register')
        .send({
            nome: "Guilherme Santos",
            email: "guilherme@gmail.com",
            senha: "Guilherme@2245"
        })
    
    expect(registerResponse.status).toBe(201)
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

    expect(loginResponse.status).toBe(429)
})

test('Credenciais erradas', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "matheus@gmail.com",
            senha: "sdnisindis"
        })

    expect(loginResponse.status).toBe(429)
})

test('Deve atualizar usuário', async() => {
    const updateResponse = await request(app)
        .put('/routes/users/2')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Matheuzinho Oliveira",
            email: "matheus@gmail.com"
        })
    
    expect(updateResponse.status).toBe(200)
})