const { Router } = require('express');
const SegurancaController = require('../controllers/segurancaController');

const router = new Router;

const controller = new SegurancaController;

router
    .post('/seguranca/acl', controller.cadastrarAcl.bind(controller))
    .post('/seguranca/permissoes/role', controller.cadastrarPermissoesRole.bind(controller))
    ;

module.exports = router;
