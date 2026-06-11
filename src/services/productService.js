const { Logger } = require('winston')
const redisClient = require('../config/redis')
const productRepository = require('../repositories/productRepository')
const AppError = require('../utils/AppError')
const logger = require('../config/logger')

exports.createProduct = async(nome, preco, estoque) => {

    logger.info("Tentativa de cadastro de produto iniciado")

    if(!nome || !preco || isNaN(preco) || preco <= 0){
        throw new AppError("Preencha todos os campos", 400)
    }

    const produto = await productRepository.createProduct({
        nome,
        preco
    })

    logger.info("Produto cadastrado")
    return {
        mensagem: "Produto criado",
        id: produto.id
    }

}

exports.getProducts = async() => {

    const cache = await redisClient.get('produtos')

    if(cache){
        console.log('Produtos vindo do redis')
        return JSON.parse(cache)
    }

    console.log('Produtos vindo do Banco')

    const produtos = await productRepository.getProducts()

    console.log('Salvando produtos no Redis')
    
    await redisClient.set(
        'produtos',
        JSON.stringify(produtos),
        {
            EX: 60
        }
    )


    return produtos

}

exports.updateProduct = async (id, nome, preco, estoque) => {

    if(!nome || !preco){
        throw new AppError(
            "Preencha todos os campos",
            400
        )
    }

    const result = await productRepository.updateProduct(
        id,
        nome,
        preco
    )

    if(result.affectedRows === 0){
        throw new AppError(
            "Produto não encontrado",
            404
        )
    }

    return {
        message: "Produto atualizado com sucesso",
        produtoId: id
    }

}

exports.deleteProduct = async (id) => {

    const result = await productRepository.deleteProduct(id)

    if(result.affectedRows === 0){
        throw new AppError(
            "Produto não encontrado",
            404
        )
    }

    return {
        message: "Produto deletado com sucesso",
        produtoId: id
    }

}