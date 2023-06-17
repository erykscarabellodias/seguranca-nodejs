const { Router } = require('express');
const SegurancaController = require('../controllers/segurancaController');
const permissoesRole = require('../middlewares/permissoesRole');

const router = new Router;

const controller = new SegurancaController;

router
    .post('/seguranca/acl', permissoesRole(['criar-acl']), controller.cadastrarAcl.bind(controller))
    .post('/seguranca/permissoes/role', permissoesRole(['criar-acl']), controller.cadastrarPermissoesRole.bind(controller))

module.exports = router;
