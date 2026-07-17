const logger = require('../config/logger')
const productService = require('../services/productService')

exports.createProduct = async(req, res, next) => {
    console.log("FILE: ", req.file)
    console.log("BODY:", req.body)
    logger.info('Tentativa de cadastro de produto iniciada')

    try{

        const { nome, preco, estoque, descricao, categoria } = req.body

        const imagem = req.file ? req.file.filename : null;
        console.log(req.file);
        const result = await productService.createProduct(
            nome,
            Number(preco),
            Number(estoque),
            descricao,
            imagem,
            categoria
        );

        logger.info('Produto cadastrado com sucesso')

        res.status(201).json({
        success: true,
        data: result
    })

    } catch(error){
        logger.error('Erro ao cadastrar produto')
        next(error)
    }

}

exports.getProducts = async(req, res, next) => {

    try{

        const result = await productService.getProducts()

        res.status(200).json({
        success: true,
        data: result
    })

    } catch(error){
        next(error)
    }

}

exports.updateProduct = async(req, res, next) => {

    logger.info('Tentaiva de alteração de produto iniciada')
    
    try {

        const id  = Number(req.params.id)

        const { nome, preco, estoque, descricao } = req.body

        const result = await productService.updateProduct(
            Number(req.params.id),
            nome,
            preco,
            estoque,
            descricao
        )

        logger.info('Produto atualizado com sucesso')

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch(error){
        logger.error('Erro ao atualizar produto')
        next(error)
    }

}

exports.deleteProduct = async(req, res, next) => {

    try {

        const id = Number(req.params.id)

        const result = await productService.deleteProduct(id)

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch(error){
        next(error)
    }

}

exports.getProductById = async(req, res, next) => {
    try{
        const id = Number(req.params.id)

        const produto = await productService.getProductById(id)

        return res.status(200).json(produto)
    } catch(error) {
        next(error)
    }
}