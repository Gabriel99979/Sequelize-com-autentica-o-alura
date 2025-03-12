const Service = require('./Service.js');
const { v4: uuidv4 } = require('uuid'); 

class RoleService extends Service {
    constructor() {
        super('Roles');
      }

      async criaRegistro(dto) {
          const role = await this.pegaUmRegistro({
            nome: dto.nome 
          });
      
          if (role) {
            throw new Error('Role já cadastrada');
          }
          
          try {
            const newRole = await super.criaRegistro({
              id: uuidv4(), 
              nome: dto.nome,
              descricao: dto.descricao
            });
      
            return newRole;
      
          } catch (error) {
            throw new Error('Erro ao cadastrar role');
          }
        }
}

module.exports = RoleService;