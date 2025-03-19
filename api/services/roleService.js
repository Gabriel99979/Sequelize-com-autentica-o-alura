const Service = require('./Service.js');
const { v4: uuidv4 } = require('uuid');
const logger = require('../Utils/logger'); // Supondo que você tenha um arquivo de configuração de logger

class RoleService extends Service {
    constructor() {
        super('roles');
    }

    async criaRegistro(dto) {
        // Verifica se o DTO está no formato correto
        if (!dto.nome || !dto.descricao) {
            throw new Error('Nome e descrição são obrigatórios');
        }

        // Verifica se a role já existe
        const roleExistente = await this.pegaUmRegistro({ nome: dto.nome });

        if (roleExistente) {
            logger.error(`Tentativa de criar role duplicada: ${dto.nome}`);
            throw new Error('Role já cadastrada');
        }

        try {
            // Criação da nova role com UUID único
            const newRole = await super.criaRegistro({
                id: uuidv4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            // Log do sucesso
            logger.info(`Role criada com sucesso: ${newRole.nome}`);

            return { status: 'success', data: newRole };

        } catch (error) {
            logger.error(`Erro ao tentar criar role: ${error.message}`);
            throw new Error('Erro ao cadastrar role');
        }
    }
}

module.exports = RoleService;
