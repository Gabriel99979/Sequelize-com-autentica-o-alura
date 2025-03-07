const AuthService = require('../services/authService.js');

const authService = new AuthService();

class AuthController {
    async login(req, res){
        const { email, senha } = req.body;

        try{
            const login = await authService.login({email, senha})

            res.status(200).send(login)
        } catch (error) {
            res.status(401).send({ message: error.message})
        }
        
    }
}

module.exports = AuthController;