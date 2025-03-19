const { verify, decode, JsonWebTokenError } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');
const redis = require('../config/redisClient.js'); // Importa o Redis Client

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).send('Access token não informado');
    }

    // Desestruturar o token para pegar a parte após o 'Bearer'
    const [, accessToken] = token.split(' ');

    try {
        // Verifica a validade do Access Token
        const decoded = verify(accessToken, jsonSecret.secret);

        // Adiciona os dados do usuário no objeto da requisição
        req.usuarioId = decoded.id;
        req.usuarioEmail = decoded.email;

        // Se o token for válido, continua a execução
        return next();

    } catch (error) {
        // Se o token expirou, tenta renovar com o Refresh Token
        if (error instanceof JsonWebTokenError && error.message === 'jwt expired') {
            // Recuperar o Refresh Token do cabeçalho ou do corpo da requisição
            const refreshToken = req.headers['x-refresh-token'];

            if (!refreshToken) {
                return res.status(401).send('Refresh token não informado');
            }

            try {
                // Verifica a validade do Refresh Token
                const decodedRefresh = verify(refreshToken, jsonSecret.secret);
                const storedToken = await redis.get(`refresh:${decodedRefresh.id}`);

                if (!storedToken || storedToken !== refreshToken) {
                    return res.status(401).send('Refresh token inválido ou expirado');
                }

                // Se o Refresh Token for válido, gera um novo Access Token
                const newAccessToken = sign(
                    { id: decodedRefresh.id, email: decodedRefresh.email },
                    jsonSecret.secret,
                    { expiresIn: '1d' }
                );

                // Retorna o novo Access Token
                return res.status(200).send({ accessToken: newAccessToken });

            } catch (refreshError) {
                return res.status(401).send('Erro ao renovar Access Token com Refresh Token');
            }
        }

        // Se o erro não for de expiração do Access Token, retorna erro 401
        return res.status(401).send('Usuário não autorizado');
    }
};
