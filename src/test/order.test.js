const request = require('supertest')
const app = require('../app')
const e = require('express')
const { login } = require('../services/userService')


test('Deve criar pedido a partir do carrinho', async () => {

    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'matheus@gmail.com',
            senha: 'Matheus@2245'
        })

    const tokenUser = loginResponse.body.data.token

    await request(app)
        .post('/routes/carrinho')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            produto_id: 3,
            quantidade: 1
        })

    const pedidoResponse = await request(app)
        .post('/routes/pedido')
        .set('Authorization', `Bearer ${tokenUser}`)

    expect(pedidoResponse.status).toBe(201)

    expect(pedidoResponse.body.success).toBe(true)

    expect(pedidoResponse.body.data).toHaveProperty('pedido_id')

    expect(pedidoResponse.body.data).toHaveProperty('total')
})