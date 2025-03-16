const Service = require('./Service.js');
const { v4: uuidv4 } = require('uuid'); 

class PermissaoService extends Service {
    constructor() {
        super('permissoes');
      }

      async criaRegistro(dto) {
                const Permissao = await this.pegaUmRegistro({
                  nome: dto.nome 
                });
            
                if (Permissao) {
                  throw new Error('Permissao já cadastrada');
                }
                
                try {
                  const newPermissao = await super.criaRegistro({
                    id: uuidv4(), 
                    nome: dto.nome,
                    descricao: dto.descricao
                  });
            
                  return newPermissao;
            
                } catch (error) {
                  throw new Error('Erro ao cadastrar Permissao');
                }
              }
}

module.exports = PermissaoService;