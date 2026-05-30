const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.addToCart = async (
    usuarioId,
    produtoId,
    quantidade
) => {

    return await prisma.carrinho.create({
        data: {
            usuarioId,
            produtoId,
            quantidade
        }
    })

}

exports.getCart = async (usuarioId) => {

    return await prisma.carrinho.findMany({
        where: {
            usuarioId
        },
        include: {
            produto: true
        }
    })

}