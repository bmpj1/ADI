const knex = require("knex");
const config = require("../knexfile");
const db = process.env.NODE_ENV.toString()==="test" ? 
    knex(config.test) :
    knex(config.development);

/** 
 * Aqui escribimos las funciones que queremos que
 * se puedan acceder desde otros archivos.
 */ 
module.exports = {
    add,
    tabla,
    findById,
    remove,
    update,
    login
}

/**
 * Metodo que permite agregar una tupla a la BDD. Mirar la migration de la tabla deseada para ver los campos.
 * @author Brian Mathias Pesci Juliani
 * @param {string} tabla - String con el nombre de la tabla a trabajar
 * @param {*} tupla - Body de la peticion (los atributos deben coincidir con los de la migration de la tabla)
 * @returns {int} - ID del objeto insertado
 */
async function add(tabla, tupla) {
    const [id] = await db(tabla).insert(tupla)
    /*
    .then(() => {
        return findById(id)
    })
    */
    return id;
}

/**
 * Metodo que devuelve una COLLECTION DE TODA UNA TABLA
 * @author Brian Mathias Pesci Juliani
 * @param {string} tabla - String con el nombre de la tabla a trabajar
 * @returns {Array} - Array con todas los datos de la tabla
 */
async function tabla(tabla) {
    const result = await db(tabla).paginate({perPage: 10, currentPage: 1})
    return result
}

/**
 * Metodo que permite obtener una TUPLA DE UNA TABLA
 * @author Brian Mathias Pesci Juliani
 * @param {string} tabla - String con el nombre de la tabla a trabajar
 * @param {int} id - ID del objeto a consultar
 * @returns {*} - Datos del objeto consultado
 */
async function findById(tabla, id) {
    const result = await db(tabla)
    .where({ id })  // usar .where({ id:id }) si el nombre del parametro no coincide con el nombre en la tabla
    .first()    // .first() evita siga buscando coincidencias en la tabla
    
    return result
}

/**
 * Metodo que permite ELIMINAR UNA TUPLA DE UNA TABLA
 * @author Brian Mathias Pesci Juliani
 * @param {string} tabla - String con el nombre de la tabla a trabajar
 * @param {int} id - ID del objeto
 * @returns {int} - Numero de filas afectadas por el delete
 */
async function remove(tabla, id) {
    const result = await db(tabla)
    .where({ id })
    .del()

    return result
}

/**
 * Metodo que permite ACTUALIZAR LOS DATOS DE UNA TUPLA DE LA TABLA
 * @author Brian Mathias Pesci Juliani
 * @param {string} tabla - String con el nombre de la tabla a trabajar 
 * @param {int} id - ID del objeto
 * @param {*} changes - Cambios a realizar sobre el objeto
 * @returns {int} - Numero de filas afectadas por el update
 */
async function update(tabla, id, changes) {
    const result = await db(tabla)
    .where({ id })
    .first()
    .update(changes, [id])

    return result
}

/**
 * Metodo que controla el login
 * @param {string} email 
 * @param {string} password 
 * @returns {*} - Datos del usuario logueado
 */
async function login(email, password) {
    const result = await db("usuarios")
    .where( {email, password} )
    .first()

    return result
}