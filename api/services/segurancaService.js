const dataSource = require('../models')
const Sequelize = require('sequelize');

class SegurancaService {
    async cadastrarAcl(dto) {
        const usuario = await dataSource.usuarios.findOne({
            include: [
                {
                    model: dataSource.roles,
                    as: 'roles_do_usuario',
                    attibutes: ['id', 'nome', 'descricao']
                },
                {
                    model: dataSource.permissoes,
                    as: 'permissoes_do_usuario',
                    attributes: ['id', 'nome', 'descricao']
                }
            ],
            where: {
                id: dto.usuarioId
            }
        })

        if(!usuario){
            throw new Error('Usuario não cadastrado')
        }

        const rolesCadastradas = await dataSource.roles.findAll({
         where: {
            id: {
                [Sequelize.Op.in]: dto.roles
            }
         }   
        })

        const permissoesCadastradas = await dataSource.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
             }   
        })

        await usuario.removeRoles_do_usuario(usuario.roles_do_usuario)
        await usuario.removePermissoes_do_usuario(usuario.permissoes_do_usuario)

        await usuario.addRoles_do_usuario(rolesCadastradas)
        await usuario.addPermissoes_do_usuario(permissoesCadastradas)

        const novoUsuario = await dataSource.usuarios.findOne({
            include: [
                {
                    model: dataSource.roles,
                    as: 'roles_do_usuario',
                    attributes: ['id', 'nome', 'descricao']
                },
                {
                    model: dataSource.permissoes,
                    as: 'permissoes_do_usuario', 
                    attributes: ['id', 'nome', 'descricao']
                }
            ]
        })

        return novoUsuario
    }   
}

module.exports = SegurancaService