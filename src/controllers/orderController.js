const orderService = require('../services/orderService')

exports.createOrder = async(req, res, next) => {

    try{

        const usuario_id = req.user.id

        const result = await orderService.createOrder(
            usuario_id
        )

        res.status(201).json({
        success: true,
        data: result
    })

    } catch(error){
        next(error)
    }

}

exports.getOrders = async(req, res, next) => {

    try{

        const usuario_id = req.user.id

        const pedidos = await orderService.getOrders(
            usuario_id
        )

        res.status(200).json({
        success: true,
        data: pedidos
    })

    } catch(error){
        next(error)
    }

}