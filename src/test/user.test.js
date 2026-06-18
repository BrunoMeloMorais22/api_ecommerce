const request = require('supertest')
const app = require('../app')
const { Prisma } = require('@prisma/client')

let tokenAdmin

beforeAll(async () => {
    const loginAdminResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Admin@123"
        })

    tokenAdmin = loginAdminResponse.body.token
})

describe('Retornar Usuários', () => {

    test('Deve listar usuários com sucesso', async () => {
        const response = await request(app)
            .get('/routes/users')
            .set('Authorization', `Bearer ${tokenAdmin}`)

        expect(response.status).toBe(200)
    })

})

test('Deve criar usuário', async () => {
    const registerResponse = await request(app)
        .post('/routes/register')
        .send({
            nome: "Fabricio de Souza",
            email: "fabricio@gmail.com",
            senha: "Fabricio@2245"
        })
    console.log(registerResponse.body)
    expect(registerResponse.status).toBe(201)
})

test('Deve dar erro de credenciais inválidas(email)', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "fabricio2@gmail.com",
            senha: "Fabricio@2245"
        })
})

test('Deve dar erro de credenciais inválidas(senha)', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "fabricio@gmail.com",
            senha: "Fabricio@22454"
        })
})

test('Deve retornar usuário não encontrado', async () => {
    const updateUser = await request(app)
        .put('/routes/users/5')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "heitorzinho"
        })
    console.log(updateUser.body)
    expect(updateUser.status).toBe(404)
})

