const { Router } = require('express');
const authController = require('../controllers/authController'); // Já importa a instância
const router = Router();

router.post('/auth/login', (req, res) => authController.login(req, res));
router.post('/auth/refresh', (req, res) => authController.refreshToken(req, res));

module.exports = router;
