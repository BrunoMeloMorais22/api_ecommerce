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

    console.log('Admin criado')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())