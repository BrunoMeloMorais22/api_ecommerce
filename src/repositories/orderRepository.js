const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getCartItems = async (usuarioId) => {
    return await prisma.carrinho.findMany({
        where: {
            usuarioId
        },
        include: {
            produto: true
        }
    })
}

exports.createOrder = async (usuarioId, total) => {
    return await prisma.pedido.create({
        data: {
            usuarioId,
            total
        }
    })
}

exports.clearCart = async (usuarioId) => {
    return await prisma.carrinho.deleteMany({
        where: {
            usuarioId
        }
    })
}

exports.getOrders = async (usuarioId) => {
    return await prisma.pedido.findMany({
        where: {
            usuarioId
        },
        include: {
            usuario: true
        }
    })
}