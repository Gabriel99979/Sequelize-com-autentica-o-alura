const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute.js')
const usuario = require('./usuarioRoute.js')
const auth = require('./authRoute.js')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    produto,
    usuario
  )
}
