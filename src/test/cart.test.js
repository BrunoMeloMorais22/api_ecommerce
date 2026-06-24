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
    
    tokenUser = loginUserResponse.body.data.token

    const loginAdminResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "bruno@gmail.com",
            senha: "Admin@123"
        })
    tokenAdmin = loginAdminResponse.body.data.token
})

test('Carrinho Vazio(preencha todos os campos)', async() => {
    const carrinhoResponse = await request(app)
        .post('/routes/carrinho')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({

        })
    
    console.log(carrinhoResponse.body)
    expect(carrinhoResponse.status).toBe(400)
})

test('Carrinho vazio', async () => {
    const orderResponse = await request(app)
        .post('/routes/pedido')
        .set('Authorization', `Bearer ${tokenUser}`)

    expect(orderResponse.status).toBe(400)
})

test('Pegar itens do carrinho', async () => {
    const pegarItens = await request(app)
        .get('/routes/pedidos')
        .set('Authorization', `Bearer ${tokenUser}`)

    console.log(pegarItens.body)
    expect(pegarItens.status).toBe(200)
})

test('Deve adicionar produtos ao carrinho', async () => {
    const response = await request(app)
        .post('/routes/carrinho')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            produto_id: 1,
            quantidade: 5
        })
    
    console.log(response.body)
    expect(response.status).toBe(200)
})

test('Quantidade não pode ser negativa', async() => {
    const response = await request(app)
        .post('/routes/carrinho')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            produto_id: 3,
            quantidade: -2
        })
    
    expect(response.status).toBe(400)
})

