const SegurancaService = require("../services/segurancaService");

class SegurancaController {
    constructor() {
        this.service = new SegurancaService();
    }

    async cadastrarAcl(req, res) {
        const { roles, permissoes } = req.body;
        const { usuarioId } = req;

        try {
            const acl = await this.service.cadastrarAcl({ roles, permissoes, usuarioId })

            return res.status(201).send(acl);
        } catch (e) {
            res.status(400).send({ message: e.message });
        }
    }
}

module.exports = SegurancaController;