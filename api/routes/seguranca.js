const { Router } = require('express')
const SegurancaController = require('../controllers/segurancaController.js')
const segurancaController = new SegurancaController()

const router = Router()

router
  .post('/seguranca/acl', (req, res) => segurancaController.cadastrarAcl(req, res))
  

module.exports = router