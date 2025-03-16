const dataSource = require('../models')

class SegurancaService {
    async cadastrarAcl(dto) {
        const usuario = await dataSource.usuarios.findOne({
            include: [
                {
                    model: dataSource.roles,
                    as: 'usuarios_com_esse_papel',
                    attibutes: ['id', 'nome', 'descricao']
                },
                {
                    model: dataSource.permissoes,
                    as: 'usuarios_com_permissoes',
                    attributes: ['id', 'nome', 'descricao']
                }
            ],
            where: {
                id: dto.usuarioId
            }
        })
    }   
}

module.exports = SegurancaService