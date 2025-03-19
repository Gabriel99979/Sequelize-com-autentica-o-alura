const Sequelize = require('sequelize');
const { Op } = Sequelize;
const dataSource = require('../models');
const logger = require('../Utils/logger'); // Logger para monitoramento

class SegurancaService {
    
    // Método para cadastrar ACL (Access Control List) ao usuário
    async cadastrarAcl(dto) {
        // Validação do DTO de entrada
        if (!dto.usuarioId || !Array.isArray(dto.roles) || !Array.isArray(dto.permissoes)) {
            throw new Error('Dados inválidos para cadastrar ACL.');
        }

        // Iniciar transação para garantir atomicidade
        const transaction = await dataSource.sequelize.transaction();

        try {
            const usuario = await dataSource.usuarios.findOne({
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
                ],
                where: {
                    id: dto.usuarioId
                },
                transaction
            });

            if (!usuario) {
                throw new Error('Usuário não cadastrado');
            }

            const rolesCadastradas = await dataSource.roles.findAll({
                where: {
                    id: {
                        [Op.in]: dto.roles
                    }
                },
                transaction
            });

            const permissoesCadastradas = await dataSource.permissoes.findAll({
                where: {
                    id: {
                        [Op.in]: dto.permissoes
                    }
                },
                transaction
            });

            // Remover roles e permissões antigas e adicionar as novas
            await usuario.removeRoles_do_usuario(usuario.roles_do_usuario, { transaction });
            await usuario.removePermissoes_do_usuario(usuario.permissoes_do_usuario, { transaction });

            await usuario.addRoles_do_usuario(rolesCadastradas, { transaction });
            await usuario.addPermissoes_do_usuario(permissoesCadastradas, { transaction });

            // Confirmar as alterações e buscar o usuário atualizado
            await transaction.commit();

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
                ],
                where: {
                    id: dto.usuarioId
                }
            });

            return novoUsuario;
        } catch (error) {
            await transaction.rollback();
            logger.error(`Erro ao cadastrar ACL: ${error.message}`);
            throw new Error('Erro ao cadastrar ACL.');
        }
    }

    // Método para cadastrar permissões em uma role
    async cadastrarPermissoesRoles(dto) {
        // Validação do DTO de entrada
        if (!dto.roleId || !Array.isArray(dto.permissoes)) {
            throw new Error('Dados inválidos para cadastrar permissões à role.');
        }

        // Iniciar transação para garantir atomicidade
        const transaction = await dataSource.sequelize.transaction();

        try {
            const role = await dataSource.roles.findOne({
                include: [
                    {
                        model: dataSource.permissoes,
                        as: 'permissoes_das_roles',
                        attributes: ['id', 'nome', 'descricao']
                    }
                ],
                where: {
                    id: dto.roleId
                },
                transaction
            });

            if (!role) {
                throw new Error('Role não cadastrada');
            }

            const permissoesCadastradas = await dataSource.permissoes.findAll({
                where: {
                    id: {
                        [Op.in]: dto.permissoes
                    }
                },
                transaction
            });

            // Remover permissões antigas e adicionar as novas
            await role.removePermissoes_das_roles(role.permissoes_das_roles, { transaction });
            await role.addPermissoes_das_roles(permissoesCadastradas, { transaction });

            // Confirmar as alterações e buscar a role atualizada
            await transaction.commit();

            const novaRole = await dataSource.roles.findOne({
                include: [
                    {
                        model: dataSource.permissoes,
                        as: 'permissoes_das_roles',
                        attributes: ['id', 'nome', 'descricao']
                    }
                ],
                where: {
                    id: dto.roleId
                }
            });

            return novaRole;
        } catch (error) {
            await transaction.rollback();
            logger.error(`Erro ao cadastrar permissões à role: ${error.message}`);
            throw new Error('Erro ao cadastrar permissões à role.');
        }
    }
}

module.exports = SegurancaService;
