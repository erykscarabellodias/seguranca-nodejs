const uuid = require('uuid');
const database = require('../models')

class PermissaoService {
    async cadastrar(dto) {
        const { nome, descricao } = dto;

        const permissao = await database.permissoes.findOne({
            where: {
                nome
            }
        })

        if (permissao) {
            throw new Error('Esta permissão já existe');
        }

        try {
            const permissaoCriada = await database.permissoes.create({
                id: uuid.v4(),
                nome,
                descricao
            });


            return permissaoCriada
        } catch (e) {
            throw new Error('Houve um erro ao cadastrar a permissão');
        }
    }

    async listar() {
        try {
            return await database.permissoes.findAll();
        } catch (e) {
            throw new Error('Houve um erro ao listar as permissões');
        }
    }

    async detalhar(id) {
        try {
            const permissao = await database.permissoes.findOne({
                where: {
                    id
                }
            })

            if (!permissao) {
                throw new Error('Esta permissao não existe');
            }

            return permissao;
        } catch (e) {
            if (e.message === 'Esta permissao não existe') {
                throw new Error(e.message);
            }

            throw new Error('Houve um erro ao buscar sua permissao')
        }
    }
}

module.exports = PermissaoService;