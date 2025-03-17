const { Router } = require('express')
const SegurancaController = require('../controllers/segurancaController.js')
const segurancaController = new SegurancaController()

const router = Router()

router
  .post('/seguranca/acl', (req, res) => segurancaController.cadastrarAcl(req, res))
  .post('/seguranca/permissoes-roles', (req, res) => segurancaController.cadastrarPermissoesRoles(req, res))
  

module.exports = router