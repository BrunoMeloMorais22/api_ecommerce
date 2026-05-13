const productService = require('../services/productService')

exports.createProduct = async(req, res, next) => {

    try{

        const { nome, preco } = req.body

        const result = await productService.createProduct(
            nome,
            preco
        )

        res.status(201).json(result)

    } catch(error){
        next(error)
    }

}

exports.getProducts = async(req, res, next) => {

    try{

        const produtos = await productService.getProducts()

        res.status(200).json(produtos)

    } catch(error){
        next(error)
    }

}