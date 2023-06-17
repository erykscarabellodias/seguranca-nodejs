const database = require('../models');
const Sequelize = require('sequelize');

const permissoesRole = (listaPermissoes) => {
    return async (req, res, next) => {
        const { usuarioId } = req;

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        });

        if (!usuario) {
            return res.status(401).send({ message: 'Este usuário não existe' });
        }

        let listaDeIdsDeRoles = [];

        Object.values(usuario.usuario_roles).map((role) => {
            listaDeIdsDeRoles.push(role.id);
        });

        if (listaDeIdsDeRoles.length === 0) {
            return res.status(401).send({ message: 'Usuário não possui acesso a esta rota' });
        }

        const roles = await database.roles.findAll({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: {
                    [Sequelize.Op.in]: listaDeIdsDeRoles
                }
            }
        });

        let possuiPermissao = false;

        roles.map((role) => {
            possuiPermissao = role.roles_das_permissoes
                .map((permissao) => permissao.nome)
                .some((permissao) => listaPermissoes.includes(permissao))
        });

        if (!possuiPermissao) {
            return res.status(401).send({ message: 'O usuário não tem acesso a esta rota' });
        }

        return next();
    }
}

module.exports = permissoesRole;