'use strict';
const { v4: uuidv4 } = require('uuid'); 
const { hash } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('usuarios', [{
        id: uuidv4(),
        nome: 'gabriel',
        email: 'gabrielteste@email.com',
        senha: await hash('1234', 8),
        createdAt: '2025-03-12 22:02:10',
        updatedAt: '2025-03-12 22:02:15',
      }
     ], {});
  
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Usuario', null, {}); 
  }
};
