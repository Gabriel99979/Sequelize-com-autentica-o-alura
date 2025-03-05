'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class produtos extends Model {
    static associate(models) {
      
    }
  }
  produtos.init({  
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT
  }, {
    sequelize,
    tabelName: 'produtos',
    modelName: 'Produto',
  })
  return produtos
}