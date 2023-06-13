const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
    async cadastrar(dto) {
        const { nome, email, senha } = dto;

        const usuario = await database.usuarios.findOne({
            where: {
                email: email
            }
        })

        if (usuario) {
            throw new Error('Este usuário já existe');
        }

        const senhaCriptografada = await hash(senha, 5);

        try {
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome,
                email,
                senha: senhaCriptografada
            });

            return novoUsuario;
        } catch (e) {
            throw new Error('Houve um erro ao cadastrar o usuário');
        }

    }
}

module.exports = UsuarioService;