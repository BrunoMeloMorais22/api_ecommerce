const request = require('supertest')
const app = require('../app')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

let tokenAdmin
let tokenUser

beforeAll(async () => {

    const loginUserResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'matheus@gmail.com',
            senha: 'Matheus@2245'
        })
    
    tokenUser = loginUserResponse.body.data.token

    const loginAdminResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'bruno@gmail.com',
            senha: 'Admin@123'
        })

    tokenAdmin = loginAdminResponse.body.data.token

})

test('Admin pode cadastrar produtos', async() => {
    const productResponse = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Blusa overside treino",
            preco: 150,
            estoque: 5
        })
    
    expect(productResponse.status).toBe(201)
})

test('Usuário comum não pode cadastrar produto', async() => {
    const response = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            nome: "Notebook Gamer",
            preco: 3500,
            estoque: 12
        })

    expect(response.status).toBe(403)

})

test('Não pode cadastrar produto com preço negativo', async() => {
    const response = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Televisão 4K 82'p",
            preco: -5000,
            estoque: 15
        })
    console.log(response.body)
    expect(response.status).toBe(400)
})

test('Usuário comum não pode deletar um produto', async() => {
    const response = await request(app)
        .delete('/routes/produtos/3')
        .set('Authorization', `Bearer ${tokenUser}`)
    
    console.log(response.body)
    expect(response.status).toBe(403)
})

test('Deve atualizar produto', async () => {
    const updateProduto = await request(app)
        .put('/routes/produtos/5')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Blusa overside treino",
            preco: 100,
            estoque: 5
        })
    
    console.log(updateProduto.body)
    expect(updateProduto.status).toBe(200)
})

test('Deve atualizar produto (produto não encontrado)', async () => {
    const updateProdutoResponse = await request(app)
        .put('/routes/produtos/9')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Televisão",
            preco: 2500,
            estoque: 5
        })
    console.log(updateProdutoResponse.body)
    expect(updateProdutoResponse.status).toBe(500)
})

test('Deve deletar produto', async () => {
    const deleteResponse = await request(app)
        .delete('/routes/produtos/4')
        .set('Authorization', `Bearer ${tokenAdmin}`)
    
    expect(deleteResponse.status).toBe(200)
})

test('Deve deletar um produto (produto não encontrado)', async() => {
    const response = await request(app)
        .delete('/routes/produtos/9')
        .set('Authorization', `Bearer ${tokenAdmin}`)
    
    console.log(response.body)
    expect(response.status).toBe(500)
})