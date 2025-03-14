const { Router } = require('express');
const RoleController = require('../controllers/roleController.js')

const roleController = new RoleController()

const autenticado = require('../middleware/autenticado.js')

const router = Router()

router.use(autenticado);

router
    .post('/roles', (req, res) => roleController.criaNovo(req, res))
    .get('/roles', (req, res) => roleController.pegaTodos(req, res))
    .get('/roles/:id', (req, res) => roleController.pegaUmPorId(req, res))
    .delete('/roles/:id',(req, res) => roleController.excluir(req, res))
    .put('/roles/:id', (req, res) => roleController.atualiza(req, res))

module.exports = router;
