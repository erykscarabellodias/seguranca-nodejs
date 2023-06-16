const PermissaoService = require('../services/permissaoService');

class PermissaoController {
    constructor() {
        this.service = new PermissaoService();
    }

    async cadastrar(req, res) {
        const { nome, descricao } = req.body;

        try {
            const permissao = await this.service.cadastrar({ nome, descricao })
            return res.status(201).send(permissao);
        } catch (e) {
            return res.status(400).send({ message: e.message })
        }
    }

    async listar(req, res) {
        try {
            const permissoes = await this.service.listar();

            return res.status(200).send(permissoes);
        } catch (e) {
            return res.status(400).send({ message: e.message });
        }
    }

    async detalhar(req, res) {
        const { id } = req.params;

        try {
            const permissao = await this.service.detalhar(id);

            return res.status(200).send(permissao);
        } catch (e) {
            return res.status(400).send({ message: e.message });
        }
    }
}

module.exports = PermissaoController;