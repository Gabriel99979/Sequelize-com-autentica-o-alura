const Service = require('./Service.js');
const { v4: uuidv4 } = require('uuid');
const logger = require('../Utils/logger'); // Supondo que você tenha um arquivo de configuração de logger

class PermissaoService extends Service {
    constructor() {
        super('permissoes');
    }
    
    // Criação do registro de Permissão
    async criaRegistro(dto) {
        // Verifica se os dados necessários foram passados
        if (!dto.nome || !dto.descricao) {
            logger.error('Dados obrigatórios ausentes para criação da permissão');
            throw new Error('Nome e descrição são obrigatórios');
        }

        // Verifica se a permissão já existe
        const permissaoExistente = await this.pegaUmRegistro({
            nome: dto.nome 
        });

        if (permissaoExistente) {
            logger.error(`Permissão já cadastrada: ${dto.nome}`);
            throw new Error('Permissão já cadastrada');
        }
        
        try {
            // Criação da nova permissão
            const newPermissao = await super.criaRegistro({
                id: uuidv4(),  // Gera um UUID único para a permissão
                nome: dto.nome,
                descricao: dto.descricao
            });

            // Log de sucesso na criação da permissão
            logger.info(`Permissão criada com sucesso: ${newPermissao.nome}`);

            // Retorna a permissão criada com um status
            return {
                status: 'success',
                data: newPermissao
            };

        } catch (error) {
            logger.error(`Erro ao cadastrar permissão: ${error.message}`);
            throw new Error('Erro ao cadastrar permissão');
        }
    }
}

module.exports = PermissaoService;
