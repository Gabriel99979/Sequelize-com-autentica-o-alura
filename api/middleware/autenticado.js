// Serve para verificar se nossa secret é válida
const { verify, decode } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js')
// O next serve para continuar caso o token seja válido
module.exports = async (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(401).send('Access token não informado')
    }
    // Vamos pegar o hash do token sem o bearer que vem, para isso precisaremos desestruturar
    const [, accessToken] = token.split(" ");

    try {
        verify(accessToken, jsonSecret.secret);
        // Vamos passar as informações do usuário para a requisição
        const { id, email } = await decode(accessToken);
        // Vamos adicionar na requisição agora para saber o que o usuário está fazendo para ter controle de acesso
        req.usuarioId = id;
        req.usuarioEmail = email;

        // Vamos continuar
        return next();
    } catch(error){
        res.status(401).send('Usuario não autorizado');
    }

}