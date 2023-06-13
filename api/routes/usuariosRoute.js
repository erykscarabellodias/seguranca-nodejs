const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController');

const router = new Router();

router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios')
    .get('/usuarios/id/:id')
    .put('/usuarios/id/:id')
    .delete('/usuarios/id/:id');

module.exports = router;
