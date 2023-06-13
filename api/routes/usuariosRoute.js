const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController');

const router = new Router();

const controller = new UsuarioController();

router
    .post('/usuarios', controller.cadastrar.bind(controller))
    .get('/usuarios')
    .get('/usuarios/id/:id')
    .put('/usuarios/id/:id')
    .delete('/usuarios/id/:id');

module.exports = router;
