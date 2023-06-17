const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
const roles = require('../middlewares/roles');

const router = Router()

router
  .post('/produto', roles(['Gerente']), ProdutoController.cadastrarProduto)
  .get('/produto', roles(['Gerente']), ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id', roles(['Gerente']), ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', roles(['Gerente']), ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', roles(['Gerente']), ProdutoController.editarProduto)

module.exports = router