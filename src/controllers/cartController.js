const cartService = require('../services/cartService')

exports.addToCart = async(req, res, next) => {

    try{

        const { produto_id, quantidade } = req.body

        const usuario_id = req.user.id
        console.log(req.user)
        console.log(req.user.id)

        const result = await cartService.addToCart(
            usuario_id,
            produto_id,
            quantidade
        )

        res.status(200).json({
        success: true,
        data: result
    })

    } catch(error){
        next(error)
    }

}

exports.getCart = async(req, res, next) => {

    try{

        const usuario_id = req.user.id

        const carrinho = await cartService.getCart(
            usuario_id
        )

        res.status(200).json({
        success: true,
        data: carrinho
    })

    } catch(error){
        next(error)
    }

}