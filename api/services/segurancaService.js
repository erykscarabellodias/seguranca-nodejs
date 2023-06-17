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
            console.log(e)

            if (e.message === 'Este usuário não existe') {
                throw new Error(e.message);
            }

            throw new Error('Houve um erro ao cadastrar seu usuário')
        }
    }
}

module.exports = SegurancaService;