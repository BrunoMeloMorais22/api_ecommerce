const productService = require('../services/productService')

exports.createProduct = async(req, res, next) => {

    try{

        const { nome, preco } = req.body

        const result = await productService.createProduct(
            nome,
            preco
        )

        res.status(201).json({
        success: true,
        data: result
    })

    } catch(error){
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

    try {

        const { id } = Number(req.params.id)

        const { nome, preco } = req.body

        const result = await productService.updateProduct(
            Number(req.params.id),
            nome,
            preco
        )

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch(error){
        next(error)
    }

}

exports.deleteProduct = async(req, res, next) => {

    try {

        const { id } = req.params

        const result = await productService.deleteProduct(id)

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch(error){
        next(error)
    }

}