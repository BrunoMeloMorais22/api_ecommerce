const request = require('supertest')
const app = require('../app')
const e = require('express')


test('Usuário comum não pode criar produto', async () => {

    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'matheus@gmail.com',
            senha: 'Matheus@2245'
        })

        console.log(loginResponse.body)

    const tokenUser = loginResponse.body.data.token
    const response = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenUser}`)
        .send({
            nome: "Notebook",
            preco: 2500
        })
    
    expect(response.status).toBe(403)
})

test('Admin deve criar produto', async () => {

    const loginResponse = await request(app)
        .post('/routes/login')
        .send({
            email: 'bruno@gmail.com',
            senha: 'Bruno@2245'
        })
    console.log(loginResponse.body)
    const tokenAdmin = loginResponse.body.data.token

    const response = await request(app)
        .post('/routes/produtos')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: 'Notebook Gamer',
            preco: 5000
        })

    expect(response.status).toBe(201)

})