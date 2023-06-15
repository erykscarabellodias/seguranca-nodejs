const RoleService = require('../services/roleService');

class RoleController {
    constructor() {
        this.service = new RoleService();
    }

    async cadastrar(req, res) {
        const { nome, descricao } = req.body;

        try {
            const role = await this.service.cadastrar({ nome, descricao })
            return res.status(201).send(role);
        } catch (e) {
            return res.status(400).send({ message: e.message })
        }
    }

    async listar(req, res) {
        try {
            const roles = await this.service.listar();

            return res.status(200).send(roles);
        } catch (e) {
            return res.status(400).send({ message: e.message });
        }
    }

    async detalhar(req, res) {
        const { id } = req.params;

        try {
            const role = await this.service.detalhar(id);

            return res.status(200).send(role);
        } catch (e) {
            return res.status(400).send({ message: e.message });
        }
    }
}

module.exports = RoleController;