const Service = require('./Service.js');
const { v4: uuidv4 } = require('uuid');
const logger = require('../Utils/logger'); // Supondo que você tenha um arquivo de configuração de logger

class ProdutoService extends Service {
    constructor() {
        super('produtos');
    }
    
    // Criação do registro de Produto
    async criaRegistro(dto) {
        // Verifica se os dados necessários foram passados
        if (!dto.nome || !dto.descricao || !dto.preco) {
            logger.error('Dados obrigatórios ausentes para criação do produto');
            throw new Error('Nome, descrição e preço são obrigatórios');
        }

        // Verifica se o produto já existe
        const produtoExistente = await this.pegaUmRegistro({
            nome: dto.nome 
        });

        if (produtoExistente) {
            logger.error(`Produto já cadastrado: ${dto.nome}`);
            throw new Error('Produto já cadastrado');
        }
        
        try {
            // Criação do novo produto
            const newProduto = await super.criaRegistro({
                id: uuidv4(),  // Gera um UUID único para o produto
                nome: dto.nome,
                descricao: dto.descricao,
                preco: dto.preco
            });

            // Log de sucesso na criação do produto
            logger.info(`Produto criado com sucesso: ${newProduto.nome}`);

            // Retorna o produto criado com um status
            return {
                status: 'success',
                data: newProduto
            };

        } catch (error) {
            logger.error(`Erro ao cadastrar produto: ${error.message}`);
            throw new Error('Erro ao cadastrar produto');
        }
    }
}

module.exports = ProdutoService;
