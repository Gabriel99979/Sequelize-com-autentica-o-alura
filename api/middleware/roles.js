const dataSource = require('../models');

const roles = (listaRoles) => {
    return async ( req, res, next ) => {
        const { usuarioId } = req

        const usuario = await dataSource.usuarios.findOne({
            include: [
                {
                    model: dataSource.roles,
                    as: 'roles_do_usuario',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })
       
        if (!usuario) {
            return res.status(401).send('Usuario não cadastrado')
        }

        const rolesCadastradas = usuario.roles_do_usuario
        .map((role) => role.nome)
        .some((role) => listaRoles.includes(role))
        
        if(!rolesCadastradas) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }

        return next()
    }
}

module.exports = roles