const Controller = require('./Controller.js')
const RoleService = require('../services/roleService.js');
const roleService = new RoleService();

class RoleController extends Controller {
    constructor() {
        super(roleService);
    }
}

module.exports = RoleController;