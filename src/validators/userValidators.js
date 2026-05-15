
const { z, email } = require('zod')

const registerSchema = z.object({
    nome: z.string().min(3, "Nome deve conter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string()
        .min(6, "Senha deve conter no mínimo 6 caracteres")
        .regex(/[A-Z]/, "Precisa ter letra maiúscula")
})

const logisSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha inválido")
})

module.exports = {
    registerSchema,
    logisSchema
}