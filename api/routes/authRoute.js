const { Router } = require('express');
const AuthController = require('../controllers/authController.js');
const authController = new AuthController();
const router = Router();

router
    .post('/auth/login', (req, res) => authController.login(req, res))

module.exports = router
