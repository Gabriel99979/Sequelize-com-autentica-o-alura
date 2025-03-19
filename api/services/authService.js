const dataSource = require('../models');
const { compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');
const redis = require('../config/redisClient.js'); // Importa Redis
const logger = require('../Utils/logger'); // Importa o logger

class AuthService {
    async login(dto) {
        try {
            const usuario = await dataSource.usuarios.findOne({
                attributes: ['id', 'email', 'senha'], 
                where: { email: dto.email }
            });

            if (!usuario) {
                logger.error(`Falha no login: Usuário não encontrado para o email: ${dto.email}`);
                throw new Error('Usuário ou senha inválido');
            }

            const senhasIguais = await compare(dto.senha, usuario.senha);
            if (!senhasIguais) {
                logger.error(`Falha no login: Senha incorreta para o email: ${dto.email}`);
                throw new Error('Usuário ou senha inválido');
            }

            // Gerar Access Token (expira em 1 dia)
            const acessToken = sign(
                { id: usuario.id, email: usuario.email },
                jsonSecret.secret,
                { expiresIn: '1d' }
            );

            // Gerar Refresh Token (expira em 7 dias)
            const refreshToken = sign(
                { id: usuario.id },
                jsonSecret.secret,
                { expiresIn: '7d' }
            );

            // Armazena Refresh Token no Redis com tempo de expiração de 7 dias
            await redis.set(`refresh:${usuario.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60);

            logger.info(`Usuário logado com sucesso: ${dto.email}`);
            return { acessToken, refreshToken };
        } catch (error) {
            logger.error(`Erro ao realizar login para o email: ${dto.email} - ${error.message}`);
            throw new Error('Erro ao realizar login.');
        }
    }

    // Método para renovar o Access Token usando o Refresh Token
    async refreshToken(oldRefreshToken) {
        try {
            logger.info("Iniciando a renovação do token...");

            // Verificar e decodificar o refresh token
            const decoded = verify(oldRefreshToken, jsonSecret.secret);
            logger.info(`Refresh Token decodificado com sucesso: ${decoded}`);

            // Recupera o refresh token armazenado no Redis
            const storedToken = await redis.get(`refresh:${decoded.id}`);
            logger.info(`Refresh token armazenado no Redis: ${storedToken}`);

            if (!storedToken || storedToken !== oldRefreshToken) {
                logger.error("Token não corresponde ou expirou.");
                throw new Error('Refresh token inválido ou expirado.');
            }

            // Gerar novo Access Token
            const newAccessToken = sign(
                { id: decoded.id },
                jsonSecret.secret,
                { expiresIn: '1d' }
            );

            logger.info("Novo Access Token gerado com sucesso.");
            return { newAccessToken };
        } catch (error) {
            logger.error("Erro ao tentar renovar o token: " + error.message);
            throw new Error('Erro ao renovar token.');
        }
    }
}

module.exports = AuthService;
