const logger = require('../Utils/logger.js'); // Importe seu logger

class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    async pegaTodos(req, res) {
        try {
            const listaDeRegistros = await this.entidadeService.pegaTodosOsRegistros();
            logger.info('Registros recuperados com sucesso'); // Log de sucesso
            return res.status(200).json(listaDeRegistros);
        } catch (erro) {
            logger.error(`Erro ao buscar registros: ${erro.message}`); // Log de erro
            return res.status(500).json({ error: 'Erro ao buscar registros' });
        }
    }

    async atualiza(req, res) {
        const { ...params } = req.params;
        const dadosAtualizados = req.body;

        try {
            const foiAtualizado = await this.entidadeService.atualizaRegistroSemTransacao(dadosAtualizados, params);
            if (!foiAtualizado) {
                logger.warn(`Registro com ID ${params.id} não foi atualizado`); // Log de warning
                return res.status(400).json({ mensagem: 'Registro não foi atualizado' });
            }
            logger.info(`Registro com ID ${params.id} atualizado com sucesso`); // Log de sucesso
            return res.status(200).json({ mensagem: 'Atualizado com sucesso!' });
        } catch (erro) {
            logger.error(`Erro ao atualizar registro: ${erro.message}`); // Log de erro
            return res.status(500).json({ erro: erro.message });
        }
    }

    async exclui(req, res) {
        const { id } = req.params;
        try {
            await this.entidadeService.excluiRegistro(id);
            logger.info(`Registro com ID ${id} excluído com sucesso`); // Log de sucesso
            return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (erro) {
            logger.error(`Erro ao excluir registro com ID ${id}: ${erro.message}`); // Log de erro
            return res.status(500).json({ erro: erro.message });
        }
    }

    async pegaUmPorId(req, res) {
        const { id } = req.params;
        try {
            const umRegistro = await this.entidadeService.pegaUmRegistroPorId(id);
            logger.info(`Registro com ID ${id} recuperado com sucesso`); // Log de sucesso
            return res.status(200).json(umRegistro);
        } catch (erro) {
            logger.error(`Erro ao buscar registro com ID ${id}: ${erro.message}`); // Log de erro
            return res.status(500).json({ erro: erro.message });
        }
    }

    async pegaUm(req, res) {
        const { ...params } = req.params;
        const where = converteIds(params);
        try {
            const umRegistro = await this.entidadeService.pegaUmRegistro(where);
            logger.info('Registro encontrado com sucesso'); // Log de sucesso
            return res.status(200).json(umRegistro);
        } catch (erro) {
            logger.error(`Erro ao buscar registro: ${erro.message}`); // Log de erro
            return res.status(500).json({ erro: erro.message });
        }
    }

    async criaNovo(req, res) {
        const dadosParaCriacao = req.body;
        try {
            const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
            logger.info('Novo registro criado com sucesso'); // Log de sucesso
            return res.status(200).json(novoRegistroCriado);
        } catch (erro) {
            logger.error(`Erro ao criar novo registro: ${erro.message}`); // Log de erro
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = Controller;
