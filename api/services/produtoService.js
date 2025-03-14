const Service = require('./Service.js');
const { v4: uuidv4 } = require('uuid'); 

class ProdutoService extends Service {
    constructor() {
        super('Produto');
      }
      
      async criaRegistro(dto) {
                const Produto = await this.pegaUmRegistro({
                  nome: dto.nome 
                });
            
                if (Produto) {
                  throw new Error('Produto já cadastrada');
                }
                
                try {
                  const newProduto = await super.criaRegistro({
                    id: uuidv4(), 
                    nome: dto.nome,
                    descricao: dto.descricao,
                    preco: dto.preco
                  });
            
                  return newProduto;
            
                } catch (error) {
                  throw new Error('Erro ao cadastrar Produto');
                }
              }
}

module.exports = ProdutoService;