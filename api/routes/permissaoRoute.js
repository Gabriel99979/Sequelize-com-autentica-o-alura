const { Router } = require('express')
const PermissaoController = require('../controllers/permissaoController.js')
const permissaoController = new PermissaoController()

const router = Router()

router
  .post('/permissao', (req, res) => permissaoController.criaNovo(req, res))
  .get('/permissao', (req, res) => permissaoController.pegaTodos(req, res))
  .get('/permissao/:id', (req, res) => permissaoController.pegaUmPorId(req, res))
  .delete('/permissao/:id',(req, res) => permissaoController.exclui(req, res))
  .put('/permissao/:id', (req, res) => permissaoController.atualiza(req, res))
 
 // Só para visualizar o objeto complexo do controller
 // console.log(produtoController)
module.exports = router