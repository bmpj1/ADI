const express = require("express");
const server = express();
server.use(express.json());
server.set("PORT", process.env.PORT || 3000)

var bp = require('body-parser')
var cors = require('cors')

server.use(bp.json())
server.use(cors())

// middleware
const auth = require("./middleware/auth");
const { attachPaginate } = require('knex-paginate');
attachPaginate();

// https://www.youtube.com/watch?v=pK0-5_7hDAg&ab_channel=AwaisMirza
// Import de las rutas
server.use(require('./routes/index'))
server.use(require('./routes/articulos'))
server.use(require('./routes/categorias'))
server.use(require('./routes/marcas'))
server.use(require('./routes/usuarios'))
server.use(require('./routes/auth'))

/**
 * Inicializar el servidor en el puerto especificado
 * @author Brian Mathias Pesci Juliani
 */
server.listen(server.get("PORT"), () => {
  console.log(`\nEl servidor está inicializado en el puerto ${server.get("PORT")}\n`);
  console.log(`\ SERVER ENVIROMENT=TEST : ${process.env.NODE_ENV.toString()==="test"}\n`);
});

// Exportamos el server para hacer los tests
module.exports.server = server;