const SegurancaService = require('../services/segurancaService.js');
const logger = require('../Utils/logger'); // Supondo que você tenha um arquivo de logger configurado

const segurancaService = new SegurancaService();

class SegurancaController {

    async cadastrarAcl(req, res) {
        try {
            const { roles, permissoes } = req.body;
            const { usuarioId } = req;

            if (!usuarioId || !Array.isArray(roles) || !Array.isArray(permissoes)) {
                return res.status(422).send({ message: 'Parâmetros inválidos. Certifique-se de enviar um usuário e listas de roles e permissões.' });
            }

            const acl = await segurancaService.cadastrarAcl({ roles, permissoes, usuarioId });

            return res.status(201).send(acl);
        } catch (error) {
            logger.error('Erro ao cadastrar ACL:', error);  // Logando o erro
            return res.status(400).send({ message: error.message || 'Erro ao processar a solicitação.' });
        }
    }

    async cadastrarPermissoesRoles(req, res) {
        try {
            const { roleId, permissoes } = req.body;

            if (!roleId || !Array.isArray(permissoes)) {
                return res.status(422).send({ message: 'Parâmetros inválidos. Envie um roleId e uma lista de permissões.' });
            }

            const permissoesRole = await segurancaService.cadastrarPermissoesRoles({ roleId, permissoes });

            return res.status(201).send(permissoesRole);
        } catch (error) {
            logger.error('Erro ao cadastrar permissões para a role:', error);  // Logando o erro
            return res.status(400).send({ message: error.message || 'Erro ao processar a solicitação.' });
        }
    }
}

module.exports = SegurancaController;
