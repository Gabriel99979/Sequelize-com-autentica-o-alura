const dataSource = require('../models')
const Sequelize = require('sequelize')

const permissoesRoles = (listaPermissoes) => {
    return async (req, res, next) => {
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

        let listaRolesId = []

        Object.values(usuario.roles_do_usuario).map((role) => {
            listaRolesId.push(role.id)
        })

        if (listaRolesId.length == 0) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }

        const roles = await dataSource.roles.findAll({
            include: [
                {
                    model: dataSource.permissoes,
                    as: 'permissoes_das_roles',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: {
                    [Sequelize.Op.in]: listaRolesId
                }
            }
        })

        let possuiPermissao = false;

        roles.map((role) => {
            possuiPermissao = role.permissoes_das_roles
                .map((permissao) => permissao.nome)
                .some((permissao) => listaPermissoes.includes(permissao))
        })


        if (!possuiPermissao) {
            return res.status(401).send('Usuario não tem acesso a essa rota')
        }

        return next()
    }
}

module.exports = permissoesRoles