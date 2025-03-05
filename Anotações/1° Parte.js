// Vamos começar montando nosso banco de dados
// Baixaremos tudo com o npm i
// Vamos dar o comando para criar a tabela no banco de dados
// npx sequelize model:create --name usuarios --attributes nome:string,senha:string
// Um novo arquivo foi criado a partir da migrattion de produtos
// Devido ao fato do id ser do tipo inteiro isso cria uma fragilidade no nosso sistema, para 
// resolver isso vamos usar um ID hach do tipo UUID
// Vamos remover também o autoincrement pois não vamos precisar mais dele
// Vamos colocar um valor padrão
// id: {
//     allowNull: false,
//     primaryKey: true,
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUID
//   },

// vamos ver a nova model de usuarios

// Vamos colocar no model de usuario para que a senha não seja retornada
// }, {
//     sequelize,
//     modelName: 'Usuario',
//     tableName: 'usuarios',
//     defaultScope: {
//       attributes: {
//         exclude: ['senha']
//       }
//     }
//   });

// Criaremos também uma nova rota para esse usuario