// Vamos criar as middleware de acesso, camadas de segurança para verificar se o usuário está vinculado a uma permissão ou perfil(role)
// Nova middleware role.js
// Vamos adicionar a middleware em produto
// Devido ao fato de podermos ter diferentes permissões para cada usuário

// Ultima parte dificil pois ao associar uma role ao usuario podemos cadastrar nas permissoes roles uma permissão específica para o usuário

// Vamos baixar a biblioteca ioredis
// Vamos também o criar o arquivo de  conexão ao redis redisClient.js
// Vamos agora colocar um sistema de logs com winston

// npm install winston

// criar um arquivo logger.js

// // logger.js
// const winston = require('winston');

// // Definindo o formato dos logs
// const logFormat = winston.format.combine(
//     winston.format.colorize(), // Cores no log para facilitar a leitura
//     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona a data e hora
//     winston.format.printf(({ timestamp, level, message }) => {
//         return `${timestamp} ${level}: ${message}`;
//     })
// );

// // Criando o logger com o Winston
// const logger = winston.createLogger({
//     level: 'info', // Nível de log padrão
//     transports: [
//         new winston.transports.Console({ format: logFormat }), // Exibe no console
//         new winston.transports.File({ filename: 'logs/app.log', format: logFormat }) // Registra no arquivo
//     ]
// });

// module.exports = logger;
