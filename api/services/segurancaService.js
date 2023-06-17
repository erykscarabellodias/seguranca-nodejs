const database = require('../models');
const Sequelize = require('sequelize')

class SegurancaService {
    async cadastrarAcl(dto) {
        const { roles, permissoes, usuarioId } = dto;
        try {
            const usuario = await database.usuarios.findOne({
                include: [
                    {
                        model: database.roles,
                        as: 'usuario_roles',
                        attributes: ['id', 'nome', 'descricao']
                    },
                    {
                        model: database.permissoes,
                        as: 'usuario_permissoes',
                        attributes: ['id', 'nome', 'descricao']
                    }
                ],
                where: {
                    id: usuarioId
                }
            });

            if (!usuario) {
                throw new Error('Este usuário não existe');
            }

            const rolesCadastradas = await database.roles.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: roles
                    }
                }
            })

            const permissoesCadastradas = await database.permissoes.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: permissoes
                    }
                }
            })

            await usuario.removeUsuario_roles(usuario.usuario_roles);
            await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

            await usuario.addUsuario_roles(rolesCadastradas);
            await usuario.addUsuario_permissoes(permissoesCadastradas);

            const usuarioAtualizado = await database.usuarios.findOne({
                include: [
                    {
                        model: database.roles,
                        as: 'usuario_roles',
                        attributes: ['id', 'nome', 'descricao']
                    },
                    {
                        model: database.permissoes,
                        as: 'usuario_permissoes',
                        attributes: ['id', 'nome', 'descricao']
                    }
                ],
                where: {
                    id: usuarioId
                }
            });

            return usuarioAtualizado;
        } catch (e) {
            if (e.message === 'Este usuário não existe') {
                throw new Error(e.message);
            }

            throw new Error('Houve um erro ao cadastrar seu usuário')
        }
    }

    async cadastrarPermissoesRoles(dto) {
        const { roleId, permissoes } = dto;

        try {
            const role = await database.roles.findOne({
                include: [
                    {
                        model: database.permissoes,
                        as: 'roles_das_permissoes',
                        attributes: ['id', 'nome', 'descricao']
                    }
                ],
                where: {
                    id: roleId
                }
            });

            if (!role) {
                throw new Error('Esta role não existe');
            }

            const permissoesCadastradas = await database.permissoes.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: permissoes
                    }
                }
            });

            await role.removeRoles_das_permissoes(role.roles_das_permissoes);

            await role.addRoles_das_permissoes(permissoesCadastradas);

            const roleAtualizada = await database.roles.findOne({
                include: [
                    {
                        model: database.permissoes,
                        as: 'roles_das_permissoes',
                        attributes: ['id', 'nome', 'descricao']
                    }
                ],
                where: {
                    id: roleId
                }
            });

            return roleAtualizada;
        } catch (e) {
            if (e.message === 'Esta role não existe') {
                throw new Error(e.message);
            }

            throw new Error(e.message);
        }
    }
}

module.exports = SegurancaService;