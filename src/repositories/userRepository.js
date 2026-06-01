
const { PrismaClient } = require('@prisma/client')
const { id } = require('zod/v4/locales')

const prisma = new PrismaClient()

exports.findByEmail = async (email) => {
    return await prisma.usuario.findUnique({
        where: { email }
    })
}

exports.createUser = async (data) => {
    return await prisma.usuario.create({
        data
    })
}

exports.findAll = async () => {
    return await prisma.usuario.findMany()
}

exports.findById = async (id) => {
    return await prisma.usuario.findUnique({
        where: { id }
    })
}

exports.update = async(id, data) => {
    return await prisma.usuario.update({
        where: { id },
        data
    })
}