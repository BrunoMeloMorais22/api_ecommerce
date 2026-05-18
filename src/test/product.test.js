const request = require('supertest')
const app = require('../app')
const e = require('express')



test('Deve pegar produtos cadastrados', async() => {
    const response = await request(app)
        .get('/routes/produtos')
    
    expect(response.status).toBe(200)
})