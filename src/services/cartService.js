const cartRepository = require('../repositories/cartRepository')

exports.addToCart = async(usuario_id, produto_id, quantidade) => {

    if(!produto_id || !quantidade || quantidade <= 0){
        const error = new Error("Dados inválidos")
        error.status = 400

        throw error
    }

    await cartRepository.addToCart(
        usuario_id,
        produto_id,
        quantidade
    )

    return {
        mensagem: "Adicionado ao carrinho"
    }

}

exports.getCart = async(usuario_id) => {

    const carrinho = await cartRepository.getCart(usuario_id)

    return carrinho

}