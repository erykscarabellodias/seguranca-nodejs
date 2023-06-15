const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = new Router();

const controller = new RoleController();

router
    .post('/role', controller.cadastrar.bind(controller))
    .get('/role', controller.listar.bind(controller))
    .get('/role/:id', controller.detalhar.bind(controller));

module.exports = router;

