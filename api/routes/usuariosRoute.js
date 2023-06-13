const { Router } = require('express');

const router = new Router();

router
    .post('/usuarios')
    .get('/usuarios')
    .get('/usuarios/id/:id')
    .put('/usuarios/id/:id')
    .delete('/usuarios/id/:id');

module.exports = router;
