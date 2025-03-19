const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',  // Endereço do Redis
  port: 6379,         // Porta padrão do Redis
  // Não forneça a senha se o Redis não estiver configurado para exigir
});

module.exports = redis;
