const orderRepository = require('../repositories/orderRepository')
const AppError = require('../utils/AppError')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.createOrder = async(usuario_id) => {

    const carrinho = await orderRepository.getCartItems(usuario_id)

    if(carrinho.length === 0){
        throw new AppError("Carrinho vazio", 400)
    }

    await prisma.$transaction(async (tx) => {

        for(const item of carrinho){
            
            if(Number(item.produto.estoque) < Number(item.quantidade)){
                throw new AppError(
                    `Estoque insuficiente para ${item.produto.nome}`,
                    400
                )
            }

        }

        const total = carrinho.reduce((acc, item) => {
            return acc + (
                item.produto.preco *
                item.quantidade
            )
        }, 0)

        const pedido = await tx.pedido.create({
            data: {
                usuarioId: usuario_id,
                total
            }
        })

        for(const item of carrinho){

            await tx.pedidoItem.create({
                data: {
                    pedidoId: pedido.id,
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    precoUnitario: item.produto.preco
                }
            })

        }

        for(const item of carrinho){

            await tx.produto.update({
                where: {
                    id: item.produtoId
                },
                data: {
                    estoque:
                        item.produto.estoque -
                        item.quantidade
                }
            })

        }

        await tx.carrinho.deleteMany({
            where: {
                usuarioId: usuario_id
            }
        })

    })

}

exports.getOrders = async(usuario_id) => {

    const pedidos = await orderRepository.getOrders(usuario_id)

    return pedidos

}

