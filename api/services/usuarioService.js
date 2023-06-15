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

    async listar() {
        try {
            const usuarios = database.usuarios.findAll();

            return usuarios;
        } catch (e) {
            throw new Error('Houve um erro ao listar os usuários');
        }
    }

    async detalhar(id) {
        try {
            const usuario = await database.usuarios.findOne({
                where: {
                    id
                }
            });

            if (usuario === null) {
                throw new Error('Este usuário não existe')
            }

            return usuario;
        } catch (e) {
            if (e.message === 'Este usuário não existe') {
                throw new Error(e.message);
            }

            throw new Error('Houve um erro ao buscar seu usuário');
        }
    }
}

module.exports = UsuarioService;