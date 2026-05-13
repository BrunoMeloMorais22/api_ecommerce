const orderRepository = require('../repositories/orderRepository')

exports.createOrder = async(usuario_id) => {

    const carrinho = await orderRepository.getCartItems(usuario_id)

    if(carrinho.length === 0){
        const error = new Error("Carrinho vazio")
        error.status = 400

        throw error
    }

    const total = carrinho.reduce((acc, item) => {
        return acc + (item.preco * item.quantidade)
    }, 0)

    const pedido = await orderRepository.createOrder(
        usuario_id,
        total
    )

    await orderRepository.clearCart(usuario_id)

    return {
        mensagem: "Pedido criado",
        pedido_id: pedido.id,
        total
    }

}

exports.getOrders = async(usuario_id) => {

    const pedidos = await orderRepository.getOrders(usuario_id)

    return pedidos

}