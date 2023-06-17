const { where } = require('sequelize');
const database = require('../models');

const permissoes = (listaDePermissoes) => {
    return async (req, res, next) => {
        const { usuarioId } = req;

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(401).send({ message: 'Este usuário não existe' });
        }

        const permissoesCadastradas = usuario.usuario_permissoes
            .map((permissao) => permissao.nome)
            .some((permissao) => listaDePermissoes.includes(permissao));

        if (!permissoesCadastradas) {
            return res.status(401).send({ message: 'Usuário não possui acesso a esta rota' })
        }

        return next();
    }
}

module.exports = permissoes;