const orderRepository = require('../repositories/orderRepository')
const AppError = require('../utils/AppError')

exports.createOrder = async(usuario_id) => {

    console.log('Entrou no service')

    const carrinho = await orderRepository.getCartItems(usuario_id)
    
    console.log(' Pegou o carrinho')
        console.log(carrinho)
    if(carrinho.length === 0){
        throw new AppError("Carrinho Vazio", 400)
    }

    const total = carrinho.reduce((acc, item) => {

    return acc + (Number(item.produto.preco) * Number(item.quantidade))

}, 0)

console.log("TOTAL", total)
    console.log('TOTAL',total)
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