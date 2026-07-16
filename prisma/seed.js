const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main(){
    const senhaHash = await bcrypt.hash('Admin@123', 10)

    await prisma.usuario.create({
        data:{
            nome: 'Bruno Melo de Morais',
            email: 'bruno@gmail.com',
            senha: senhaHash,
            role: 'Admin'
        }
    })  

    await prisma.produto.deleteMany()

    await prisma.produto.createMany({
        data: [
            {
                imagem: "1784213756234.jpeg",
                nome: "Iphone 14 Pro Max",
                descricao: "Iphone 14 Pro Max | 256GB de armazenamento | 16GB de RAM",
                preco: 3500, 
                estoque: 10,
                categoria: "Eletrônicos" 
            },

            {
                imagem: "1784213805511.jpg",
                nome: "Mouse Gamer",
                descricao: "RGB | 12000 DPI",
                preco: 300,  
                estoque: 30,
                categoria: "Periféricos"
            },

            {
                imagem: "1784229464366.png",
                nome: "Camisa do Brasil",
                descricao: "Camisa tradicional do Brasil",
                preco: 500,  
                estoque: 20,
                categoria: "Roupa"
            }
        ]
    })

    console.log('Admain criado')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())