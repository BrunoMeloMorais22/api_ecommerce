require('dotenv').config()

const app = require('./src/app')

const { swaggerUi, specs } = require('./src/docs/swagger')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

