const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.createProduct = async (data) => {
    return await prisma.produto.create({
        data
    })
}

exports.getProducts = async () => {
    return await prisma.produto.findMany()
}

exports.updateProduct = async (id, nome, preco, estoque, descricao) => {
    return await prisma.produto.update({
        where: { id },
        data: {
            nome,
            preco,
            estoque,
            descricao
        }
    })
}

exports.deleteProduct = async (id) => {
    return await prisma.produto.delete({
        where: {
            id: Number(id)
        } 
    })
}

exports.getProductById = async (id) => {
    return await prisma.produto.findUnique({
        where: {
            id: Number(id)
        }
    });
}