const request = require('supertest')
const app = require('../app')
const { Prisma } = require('@prisma/client')

let tokenAdmin
let tokenUser

beforeAll(async () => {
    const loginAdminResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Admin@123"
        })

    tokenAdmin = loginAdminResponse.body.data.token

    const loginUserResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'fabricio@gmail.com',
            senha: "Fabricio@2245"
        })
    
    tokenUser = loginUserResponse.body.data.token
})

describe('Retornar Usuários', () => {

    test('Deve listar usuários com sucesso', async () => {
        const response = await request(app)
            .get('/routes/users')
            .set('Authorization', `Bearer ${tokenAdmin}`)
        console.log(response.body)
        expect(response.status).toBe(200)
    })

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

test('Deve atualizar usuário', async () => {
    const updateUserResponse = await request(app)
        .put('/routes/users/4')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "fabricinho de Souza"
        })  
    
    expect(updateUserResponse.status).toBe(200)
})

test('Acesso negado pra atualizar', async () => {
    const responseUpdate = await request(app)
        .put('/routes/users/4')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            nome: "Facricião Souza",
            email: "fabricio@gmail.com"
        })
})
