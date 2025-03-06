class Controller {
    constructor (entidadeService) {
        this.entidadeService = entidadeService;
    }

    async pegaTodos(req, res) {
        try {
            // Método para encontrar todos os registros findAll do sequelize
            const listaDeRegistros = await this.entidadeService.pegaTodosOsRegistros();
            return res.status(200).json(listaDeRegistros);
        } catch(erro){
            return res.status(500).json({error: 'Erro ao buscar registros'})
        }
    }

  async atualiza(req, res) {
    const { ...params } = req.params;
    const dadosAtulizados = req.body;

    try {
        const foiAtualizado = await this.entidadeService.atualizaRegistroSemTransacao(dadosAtulizados, params);
        if (!foiAtualizado) {
            return res.status(400).json({ mensagem: 'Registro não foi atualizado' });
        }
        return res.status(200).json({ mensagem: 'Atualizado com sucesso!' });
    } catch (erro) {
        console.error("Erro no Controller:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}
  

    async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(id);
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(where);
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }



} 

module.exports = Controller;