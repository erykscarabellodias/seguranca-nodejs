const database = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class AuthService {
    async login(dto) {
        const { email, senha } = dto;

        const usuario = await database.usuarios.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email
            }
        })

        if (!usuario) {
            throw new Error('Não existe um usuário com este e-mail');
        }

        const senhaConfere = await compare(senha, usuario.senha);

        if (!senhaConfere) {
            throw new Error('Senha incorreta');
        }

        const accessToken = sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.EXPIRES_IN
            }
        )

        return { accessToken }
    }
}

module.exports = AuthService;