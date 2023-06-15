const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController');
const autenticado = require('../middlewares/autenticado');

const router = new Router();

const controller = new UsuarioController();

router.use(autenticado);

router
    .post('/usuarios', controller.cadastrar.bind(controller))
    .get('/usuarios', controller.listar.bind(controller))
    .get('/usuarios/:id', controller.detalhar.bind(controller))

module.exports = router;
