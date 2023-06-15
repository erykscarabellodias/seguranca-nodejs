const uuid = require('uuid');
const database = require('../models')

class RoleService {
    async cadastrar(dto) {
        const { nome, descricao } = dto;

        const role = await database.roles.findOne({
            where: {
                nome
            }
        })

        if (role) {
            throw new Error('Esta role já existe');
        }

        try {
            const roleCriada = await database.roles.create({
                id: uuid.v4(),
                nome,
                descricao
            });


            return roleCriada
        } catch (e) {
            throw new Error('Houve um erro ao cadastrar a role');
        }
    }

    async listar() {
        try {
            return await database.roles.findAll();
        } catch (e) {
            throw new Error('Houve um erro ao listar as roles');
        }
    }

    async detalhar(id) {
        try {
            const role = await database.roles.findOne({
                where: {
                    id
                }
            })

            if (!role) {
                throw new Error('Esta role não existe');
            }

            return role;
        } catch (e) {
            if (e.message === 'Esta role não existe') {
                throw new Error(e.message);
            }

            throw new Error('Houve um erro ao buscar sua role')
        }
    }
}

module.exports = RoleService;