
const request = require('supertest')
const app = require('../app')
const e = require('express')

test("Deve responder com status 200", async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
})


//test('Deve fazer login', async () => {
    //const response = await request(app)
        //.post('/routes/login')
        //.send({
           // email: "bruno@gmail.com",
            //senha: "Bruno@2245"
       // })

   // expect(response.status).toBe(200)
//} )

test('Deve cadastrar', async () => {
    const response = await request(app)
        .post('/routes/register')
        .send({
            nome: "Matheus Campos",
            email: "matheus@gmail.com",
            senha: "Matheus@2245",
            role: 'user'
        })

    expect(response.status).toBe(201)
} )

