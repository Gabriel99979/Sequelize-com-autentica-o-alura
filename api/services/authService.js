const dataSource = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret.js')

class AuthService {
    async login(dto) {
        const usuario = await dataSource.usuarios.findOne({
            attributes: ['id', 'email', 'senha'], 
            where: {
                email: dto.email
            }
        })

        if(!usuario) {
            throw new Error('Usuario ou senha inválido');
        }
       
        const senhasIguais = await compare(dto.senha, usuario.senha);
        // Se for falso gera um erro e vamos colocar uma mensagem genérica para erro aumentando a segurança
        if(!senhasIguais) {
            throw new Error('Usuario ou senha inválido')
        }
        // Nosso token gastará um dia para expirar 
        const acessToken = sign({
            id: usuario.id,
            email: usuario.email
        // Vamos gerar um segredo para assinatura no site do MD5
        }, jsonSecret.secret, {
            expiresIn: 86400
        });
        // usuario já vai receber dentro da variável accessToken
        return { acessToken }

    }
}

module.exports = AuthService