const productRepository = require('../repositories/productRepository')

exports.createProduct = async(nome, preco) => {

    if(!nome || !preco || isNaN(preco) || preco <= 0){
        const error = new Error("Dados inválidos")
        error.status = 400

        throw error
    }

    const produto = await productRepository.createProduct({
        nome,
        preco
    })

    return {
        mensagem: "Produto criado",
        id: produto.id
    }

}

exports.getProducts = async() => {

    const produtos = await productRepository.getProducts()

    return produtos

}