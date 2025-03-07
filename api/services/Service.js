const dataSource = require('../models')

class Service {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async pegaTodosOsRegistros(where = {}) {
        return dataSource[this.model].findAll({ where: { ...where } });
    }

    async pegaUmRegistro(where) {
        return dataSource[this.model].findOne({ where: { ...where } });
    }

    async pegaUmRegistroPorId(id) {
        return dataSource[this.model].findByPk(id);
    }

    async criaRegistro(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro);
    }

    async excluiRegistro(id) {
        return dataSource[this.model].destroy({ where: { id: id } });
    }

    async atualizaRegistroSemTransacao(dadosAtualizados, where) {
        const listadeRegistrosAtualizados = await dataSource[this.model].update(dadosAtualizados, {
          where: { ...where }
        });
        if (listadeRegistrosAtualizados[0] === 0) {
          return false;
        }
        return true;
      }
}

module.exports = Service;