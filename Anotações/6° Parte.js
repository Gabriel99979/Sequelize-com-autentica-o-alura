// Vamos começar criando a tabela de roles

// sequelize model:create --name roles --attributes nome:string,descricao:string
// Vamos alterar o migration principalmente o ID

// const { Router } = require('express');

// const router = Router()

// router
//     .post('/roles')
//     .get('/role')
//     .get('/role/:id')
//     .delete('/role/:id')
//     .put('/role/:id')

// module.exports = router;

// Vamos fazer com que o usuário fique acima das outras tabelas devido a autenticação

// const bodyParser = require('body-parser')
// const produto = require('./produtoRoute.js')
// const usuario = require('./usuarioRoute.js')
// const auth = require('./authRoute.js')
// const role = require('./role.js')

// module.exports = app => {
//   app.use(
//     bodyParser.json(),
//     auth,
//     usuario,
//     produto,
//     role
//   )
// }

// Vamos agora colocar os services e controllers da role
// Podemos agora verificar se nosso cadastro está funcionando

// Vamos criar nosso crud de permissao

// npx sequelize model:create --name permissoes --attributes nome:string,descricao:string