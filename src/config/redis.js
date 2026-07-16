const { createClient } = require('redis');

const redisClient = createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
    console.error('Erro Redis:', err.message);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Redis conectado');
    } catch (error) {
        console.log('⚠️ Redis não está rodando. A API continuará sem cache.');
    }
})();

module.exports = redisClient;