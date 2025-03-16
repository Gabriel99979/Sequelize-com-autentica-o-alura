const SegurancaService = require('../services/segurancaService.js');

const segurancaService = new SegurancaService();

class SegurancaController {
    async cadastrarAcl(req, res){
        const { roles , permissoes } = req.body
        const { usuarioId } = req

        try {
            const acl = await segurancaService({ roles, permissoes, usuarioId })

            res.status(201).send(acl)
        } catch(error) {
            res.status(400).send({ message: error.message })
        }
    }
        
}


module.exports = SegurancaController;