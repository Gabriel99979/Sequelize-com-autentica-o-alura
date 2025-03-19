const logger = require('../Utils/logger'); // Importe o logger
const dataSource = require('../models');

class Service {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    // Método para pegar todos os registros
    async pegaTodosOsRegistros(where = {}) {
        try {
            logger.info(`Buscando todos os registros de ${this.model}`);
            const registros = await dataSource[this.model].findAll({ where: { ...where } });
            logger.info(`Registros encontrados: ${registros.length}`);
            return registros;
        } catch (error) {
            logger.error(`Erro ao buscar todos os registros de ${this.model}: ${error.message}`);
            throw new Error('Erro ao buscar registros.');
        }
    }

    // Método para pegar um único registro com base em um filtro
    async pegaUmRegistro(where) {
        try {
            logger.info(`Buscando um registro de ${this.model} com filtro: ${JSON.stringify(where)}`);
            const registro = await dataSource[this.model].findOne({ where: { ...where } });
            if (registro) {
                logger.info(`Registro encontrado: ${JSON.stringify(registro)}`);
            } else {
                logger.warn(`Registro não encontrado: ${JSON.stringify(where)}`);
            }
            return registro;
        } catch (error) {
            logger.error(`Erro ao buscar um registro de ${this.model}: ${error.message}`);
            throw new Error('Erro ao buscar registro.');
        }
    }

    // Método para pegar um registro por ID
    async pegaUmRegistroPorId(id) {
        try {
            logger.info(`Buscando registro de ${this.model} com ID: ${id}`);
            const registro = await dataSource[this.model].findByPk(id);
            if (registro) {
                logger.info(`Registro encontrado: ${JSON.stringify(registro)}`);
            } else {
                logger.warn(`Registro com ID ${id} não encontrado.`);
            }
            return registro;
        } catch (error) {
            logger.error(`Erro ao buscar registro de ${this.model} com ID: ${id}: ${error.message}`);
            throw new Error('Erro ao buscar registro por ID.');
        }
    }

    // Método para criar um novo registro
    async criaRegistro(dadosDoRegistro) {
        try {
            logger.info(`Criando novo registro em ${this.model}: ${JSON.stringify(dadosDoRegistro)}`);
            const novoRegistro = await dataSource[this.model].create(dadosDoRegistro);
            logger.info(`Novo registro criado: ${JSON.stringify(novoRegistro)}`);
            return novoRegistro;
        } catch (error) {
            logger.error(`Erro ao criar novo registro de ${this.model}: ${error.message}`);
            throw new Error('Erro ao criar registro.');
        }
    }

    // Método para excluir um registro por ID
    async excluiRegistro(id) {
        try {
            logger.info(`Excluindo registro de ${this.model} com ID: ${id}`);
            const deletado = await dataSource[this.model].destroy({ where: { id: id } });
            if (deletado) {
                logger.info(`Registro com ID ${id} excluído com sucesso.`);
            } else {
                logger.warn(`Registro com ID ${id} não encontrado para exclusão.`);
            }
            return deletado;
        } catch (error) {
            logger.error(`Erro ao excluir registro de ${this.model} com ID: ${id}: ${error.message}`);
            throw new Error('Erro ao excluir registro.');
        }
    }

    // Método para atualizar um registro sem usar transações
    async atualizaRegistroSemTransacao(dadosAtualizados, where) {
        try {
            logger.info(`Atualizando registro de ${this.model} com dados: ${JSON.stringify(dadosAtualizados)} e filtro: ${JSON.stringify(where)}`);
            const listaDeRegistrosAtualizados = await dataSource[this.model].update(dadosAtualizados, {
                where: { ...where }
            });
            if (listaDeRegistrosAtualizados[0] === 0) {
                logger.warn(`Nenhum registro atualizado em ${this.model} com os dados: ${JSON.stringify(dadosAtualizados)} e filtro: ${JSON.stringify(where)}`);
                return false;
            }
            logger.info(`Registro(s) atualizado(s) com sucesso em ${this.model}.`);
            return true;
        } catch (error) {
            logger.error(`Erro ao atualizar registro de ${this.model}: ${error.message}`);
            throw new Error('Erro ao atualizar registro.');
        }
    }
}

module.exports = Service;
