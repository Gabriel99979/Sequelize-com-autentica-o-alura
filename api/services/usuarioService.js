const Service = require('./Service.js');
const { hash } = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); 

class UsuarioService extends Service {
  constructor() {
    super('Usuario');
  }

  async criaRegistro(dto) {
    const usuario = await this.pegaUmRegistro({
      email: dto.email 
    });

    if (usuario) {
      throw new Error('Usuário já cadastrado');
    }
    
    try {
      // Hash da senha com fator de custo 8
      const senhaHash = await hash(dto.senha, 8);
      // Gerando um UUID V4 para o ID do usuário
      const novoUsuario = await super.criaRegistro({
        id: uuidv4(), 
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash
      });

      return novoUsuario;

    } catch (error) {
      throw new Error('Erro ao cadastrar o usuário');
    }
  }
}

module.exports = UsuarioService;
