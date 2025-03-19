const AuthService = require('../services/authService.js');
const logger = require('../Utils/logger'); // Importa o logger

const authService = new AuthService();

class AuthController {
    async login(req, res) {
        const { email, senha } = req.body;

        try {
            logger.info(`Tentativa de login para o email: ${email}`);
            const login = await authService.login({ email, senha });
            res.status(200).send(login);
            logger.info(`Login bem-sucedido para o email: ${email}`);
        } catch (error) {
            logger.error(`Falha no login para o email: ${email} - ${error.message}`);
            res.status(401).send({ message: error.message });
        }
    }

    // Adicionando o método refreshToken
    async refreshToken(req, res) {
        const { refreshToken } = req.body;

        try {
            logger.info("Tentando renovar o Access Token.");
            const newAccessToken = await authService.refreshToken(refreshToken);
            res.status(200).send({ newAccessToken });
            logger.info("Token renovado com sucesso.");
        } catch (error) {
            logger.error(`Erro ao tentar renovar o token: ${error.message}`);
            res.status(401).send({ message: error.message });
        }
    }
}

module.exports = new AuthController();
