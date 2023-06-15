const { Router } = require('express');
const AuthController = require('../controllers/authController');

const router = new Router();

const controller = new AuthController;

router.post('/auth/login', controller.login.bind(controller));

module.exports = router;