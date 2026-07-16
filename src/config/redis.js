const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
    console.error("Erro Redis:", err.message);
});

(async () => {
    try {
        await redisClient.connect();
        console.log("✅ Redis conectado");
    } catch (error) {
        console.log("⚠️ Não foi possível conectar ao Redis.");
    }
})();

module.exports = redisClient;