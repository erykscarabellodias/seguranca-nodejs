const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
const roles = require('../middlewares/roles');
const permissoes = require('../middlewares/permissoes');

const router = Router()

router
  .post('/produto', roles(['Gerente']), ProdutoController.cadastrarProduto)
  .get('/produto', roles(['Gerente']), ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id', roles(['Gerente']), ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', permissoes(['editar']), ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', permissoes(['editar']), ProdutoController.editarProduto)

module.exports = router