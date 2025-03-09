const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController.js')
const usuarioController = new UsuarioController()
// Adicionando a middleware
const autenticado = require('../middleware/autenticado.js');

const router = Router()

router.use(autenticado);

router
  .post('/usuario', (req, res) => usuarioController.criaNovo(req, res))
  .get('/usuario', (req, res) => usuarioController.pegaTodos(req, res))
  .get('/usuario/:id', (req, res) => usuarioController.pegaUmPorId(req, res))
  .delete('/usuario/:id',(req, res) => usuarioController.exclui(req, res))
  .put('/usuario/:id', (req, res) => usuarioController.atualiza(req, res))

module.exports = router