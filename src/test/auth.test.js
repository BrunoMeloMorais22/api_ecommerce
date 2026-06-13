
const request = require('supertest')
const app = require('../app')
const e = require('express')

test("Deve responder com status 200", async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
})


test('Deve adicionar o produto ao carrinho', async() => {
    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: "matheus@gmail.com",
            senha: "Matheus@2245"
        })
    
    const tokenUser = loginResponse.body.data.token
    console.log(loginResponse.body)
    
    const carrinhoResponse = await request(app)
        .post('/routes/carrinho')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            produtoId: 1,
            quantidade: 5
        })
    
    expect(carrinhoResponse.status).toBe(200)
})
