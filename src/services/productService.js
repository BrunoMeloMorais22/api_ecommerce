const productRepository = require('../repositories/productRepository')
const AppError = require('../utils/AppError')

exports.createProduct = async(nome, preco) => {

    if(!nome || !preco || isNaN(preco) || preco <= 0){
        throw new AppError("Preencha todos os campos", 400)
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

exports.updateProduct = async (id, nome, preco) => {

    if(!nome || !preco){
        throw new AppError(
            "Preencha todos os campos",
            400
        )
    }

    const result = await productRepository.updateProduct(
        id,
        nome,
        preco
    )

    if(result.affectedRows === 0){
        throw new AppError(
            "Produto não encontrado",
            404
        )
    }

    return {
        message: "Produto atualizado com sucesso",
        produtoId: id
    }

}

exports.deleteProduct = async (id) => {

    const result = await productRepository.deleteProduct(id)

    if(result.affectedRows === 0){
        throw new AppError(
            "Produto não encontrado",
            404
        )
    }

    return {
        message: "Produto deletado com sucesso",
        produtoId: id
    }

}