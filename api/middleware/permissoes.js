const dataSource = require('../models')
const permissoes = (listaPermissoes) => {
    return async (req, res, next) => {
        const { usuarioId } = req

        const usuario  = await dataSource.usuarios.findOne({
            include: [
                {
                    model: dataSource.permissoes,
                    as: 'permissoes_do_usuario',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })
        
        if(!usuario) {
            return res.status(401).send('Usuario não cadastrado')
        }

        const permissoesCadastradas = usuario.permissoes_do_usuario
            .map((permissao) => permissao.nome)
            .some((permissao) => listaPermissoes.includes(permissao))
        
        if(!permissoesCadastradas) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }

        return next()
    }
}

module.exports = permissoes