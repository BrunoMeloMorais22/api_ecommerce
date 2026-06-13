const productService = require('../services/productService')

const redisClient = require('../config/redis')
const productRepository = require('../repositories/productRepository')

jest.mock('../config/redis.js')
jest.mock('../repositories/productRepository.js')

test('Deve retornar produtos do redis', async() => {
    redisClient.get.mockResolvedValue(
        JSON.stringify([
            {
                id: 1,
                nome: 'Capa de Chuva'
            }
        ])
    )

    const result = await productService.getProducts()
    
    expect(result).toEqual([
        {
            id: 1, 
            nome: 'Capa de Chuva'
        }
    ])

    expect(productRepository.getProducts)
        .not
        .toHaveBeenCalled()
})

test('Deve buscar produtos no banco quando não existir cache', async() => {
    redisClient.get.mockResolvedValue(null)

    productRepository.getProducts.mockResolvedValue([
        {
            id: 1,
            nome: 'Iphone',
            preco: 2500
        }
    ])

    const result = await productService.getProducts()

    expect(productRepository.getProducts)
        .toHaveBeenCalled()
    
    expect(redisClient.set)
        .toHaveBeenCalled()
    
    expect(result).toHaveLength(1)
})