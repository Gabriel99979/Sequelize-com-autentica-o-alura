'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      permissoes.belongsToMany(models.roles, {
        through: models.roles_permissoes,
        as: 'roles_das_permissoes',
        foreignKey: 'permissao_id', // Garante que Sequelize use 'permissao_id'
        otherKey: 'role_id' // Define corretamente a chave secundária
      }),
      permissoes.belongsToMany(models.usuarios, {
        through: models.usuarios_permissoes,
        as: 'usuarios_com_permissoes',
        foreignKey: 'permissao_id'
      })
    }
  }
  permissoes.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permissoes'
  });
  return permissoes;
};