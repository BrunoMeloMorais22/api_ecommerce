const cartRepository = require('../repositories/cartRepository')
const AppError = require('../utils/AppError')

exports.addToCart = async(usuario_id, produto_id, quantidade) => {

    if(!produto_id || !quantidade || quantidade <= 0){
        throw new AppError("Preencha todos os campos", 400)
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