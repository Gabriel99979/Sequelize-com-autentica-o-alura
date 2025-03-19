const Service = require('./Service.js');
const { hash } = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const logger = require('../Utils/logger'); // Supondo que você tenha um arquivo de configuração de logger

class UsuarioService extends Service {
  constructor() {
    super('usuarios');
  }

  // Criação do registro de usuário
  async criaRegistro(dto) {
    // Validação para garantir que os dados obrigatórios sejam fornecidos
    if (!dto.nome || !dto.email || !dto.senha) {
      logger.error('Dados obrigatórios ausentes para criação do usuário');
      throw new Error('Nome, email e senha são obrigatórios');
    }

    // Verifica se o usuário já existe com o mesmo email
    const usuarioExistente = await this.pegaUmRegistro({
      email: dto.email
    });

    if (usuarioExistente) {
      logger.error(`Usuário já cadastrado: ${dto.email}`);
      throw new Error('Usuário já cadastrado');
    }

    try {
      // Criação do hash da senha
      const senhaHash = await hash(dto.senha, 8);

      // Geração do UUID V4 para o ID do usuário
      const novoUsuario = await super.criaRegistro({
        id: uuidv4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash
      });

      // Log de sucesso na criação do usuário
      logger.info(`Usuário criado com sucesso: ${novoUsuario.email}`);

      return {
        status: 'success',
        data: novoUsuario
      };

    } catch (error) {
      // Log de erro na criação do usuário
      logger.error(`Erro ao cadastrar usuário: ${error.message}`);
      throw new Error('Erro ao cadastrar o usuário');
    }
  }
}

module.exports = UsuarioService;
