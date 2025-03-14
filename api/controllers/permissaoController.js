const Controller = require('./Controller.js')
const PermissaoService = require('../services/permissaoService.js');
const permissaoService = new PermissaoService()

class PermissaoController extends Controller {
    constructor() {
        super(permissaoService);
    }
}

module.exports = PermissaoController;