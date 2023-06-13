const UsuarioService = require('../services/usuarioService');

class UsuarioController {
    constructor() {
        this.service = new UsuarioService();
    }

    async cadastrar(req, res) {
        const { nome, email, senha } = req.body;

        try {
            const usuario = await this.service.cadastrar({ nome, email, senha });

            return res.status(201).send(usuario);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }

    async listar(req, res) {
        try {
            const usuarios = await this.service.listar();

            return res.status(200).send(usuarios);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }
}

module.exports = UsuarioController;