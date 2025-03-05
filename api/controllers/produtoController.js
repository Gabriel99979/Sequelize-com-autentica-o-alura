const Controller = require('./Controller.js')
const ProdutoService = require('../services/produtoService.js');
const produtoService = new ProdutoService()

class ProdutoController extends Controller {
    constructor() {
        super(produtoService);
    }
}

module.exports = ProdutoController;