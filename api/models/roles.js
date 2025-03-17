'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsToMany(models.permissoes, {
        through: models.roles_permissoes,
        as: 'permissoes_das_roles',
        foreignKey: 'role_id', // Garante que Sequelize use 'role_id'
        otherKey: 'permissao_id' // Define corretamente a chave secundária
      }),
      roles.belongsToMany(models.usuarios, {
        through: models.usuarios_roles,
        as: 'usuarios_com_esse_papel',
        foreignKey: 'role_id'
      })
    }
  }
  roles.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles'
  });
  return roles;
};