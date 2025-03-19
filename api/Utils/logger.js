// logger.js
const winston = require('winston');

// Definindo o formato dos logs
const logFormat = winston.format.combine(
    winston.format.colorize(), // Cores no log para facilitar a leitura
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona a data e hora
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

// Criando o logger com o Winston
const logger = winston.createLogger({
    level: 'info', // Nível de log padrão
    transports: [
        new winston.transports.Console({ format: logFormat }), // Exibe no console
        new winston.transports.File({ filename: 'logs/app.log', format: logFormat }) // Registra no arquivo
    ]
});

module.exports = logger;
