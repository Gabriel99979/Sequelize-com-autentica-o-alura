const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController.js')
const produtoController = new ProdutoController()
const roles = require('../middleware/roles.js')
const permissoes = require('../middleware/permissoes.js')
const permissoesRoles =  require('../middleware/permissoesRoles.js')


const router = Router()
// Testa os middlewares
router
  .post('/produto', (req, res) => produtoController.criaNovo(req, res))
  .get('/produto', permissoesRoles(["listar"]), (req, res) => produtoController.pegaTodos(req, res))
  .get('/produto/:id', (req, res) => produtoController.pegaUmPorId(req, res))
  .delete('/produto/:id',(req, res) => produtoController.exclui(req, res))
  .put('/produto/:id', permissoes(["editar"]) , (req, res) => produtoController.atualiza(req, res))
 
 // Só para visualizar o objeto complexo do controller
 // console.log(produtoController)
module.exports = router