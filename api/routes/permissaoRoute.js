const { Router } = require('express');
const PermissaoController = require('../controllers/permissaoController');

const router = new Router();

const controller = new PermissaoController();

router
    .post('/permissao', controller.cadastrar.bind(controller))
    .get('/permissao', controller.listar.bind(controller))
    .get('/permissao/:id', controller.detalhar.bind(controller));

module.exports = router;

