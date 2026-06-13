const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.addToCart = async (
    usuarioId,
    produtoId,
    quantidade
) => {
    const itemExistente = await prisma.carrinho.findFirst({
        where:{
            usuarioId,
            produtoId
        }
    })

    if(itemExistente){
        return await prisma.carrinho.update({
            where: {
                id: itemExistente.id
            },
            data:{
                quantidade:
                    itemExistente.quantidade + quantidade
            }
        })
    }

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