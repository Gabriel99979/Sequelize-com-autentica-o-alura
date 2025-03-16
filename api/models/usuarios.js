'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarios.belongsToMany(models.roles, {
        through: models.usuarios_roles,
        as: 'roles_do_usuario',
        foreignKey: 'usuario_id'
      }),
      usuarios.belongsToMany(models.permissoes, {
        through: models.usuarios_permissoes,
        as: 'permissoes_do_usuario',
        foreignKey: 'usuario_id'
      })
    }
  }
  usuarios.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 40],
          // Mensagem de erro
          msg: 'O campo nome deve ter no mínimo 3 catacteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
       isEmail: {
         args: true,
         msg: 'formato do email inválido'
       }
      }
     },
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['senha']
      }
    }
  });
  return usuarios;
};