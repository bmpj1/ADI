/**
 * Tutorial de ayuda: https://www.youtube.com/watch?v=JWMf7AUzMkA&ab_channel=BrettM
 * Guia KNEX: http://knexjs.org/
 * APP para ver el esquema de la BDD: https://sqlitestudio.pl/
 */
exports.up = function(knex, Promise) {
/****************************************************************************/
    return knex.schema.createTable("marcas", tbl => {
        tbl.increments().primary() // 'id'
        tbl.string("marca")
            .notNullable()
            .unique()
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("usuarios", tbl => {
        tbl.increments().primary()  // 'id'
        tbl.string("email")
            .notNullable()
            .unique()
        tbl.string("password")
            .notNullable()
        tbl.string("nombre")
            .notNullable()
        tbl.string("apellidos")
            .notNullable()
        tbl.string("telefono")
        tbl.date("fechaNac")
        tbl.string("rol")
            .notNullable()
            .defaultTo("anonimo")   // anonimo, usuario, admin
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("direcciones", tbl => {
        tbl.increments().primary()  // 'id'
        tbl.string("linea1")
        tbl.string("linea2")
        tbl.string("cod_postal")
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("usuarios_direcciones", tbl => {
        tbl.increments().primary()
        tbl.integer("usuario_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("usuarios")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.integer("direccion_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("direcciones")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("categorias", tbl => {
        tbl.increments().primary()
        tbl.string("nombre")
            .notNullable()
            .unique()
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("articulos", tbl=> {
        tbl.increments().primary()
        tbl.integer("codigo")
            .unique()
            .notNullable()
        tbl.string("nombre")
            .notNullable()
        tbl.float("pvp")
            .notNullable()
        tbl.string("detalles")
            .nullable()
        tbl.float("valoracion", 2, 1)   // [0.0, 10.0]
            .notNullable()
            .defaultTo(0)
        tbl.integer("marca_id")
            .unsigned()
            .references("id")
            .inTable("marcas")
            .onDelete("SET NULL")   // En caso de que se borre la marca se pone a null
            .onUpdate("CASCADE") 
        tbl.integer("categoria_id")
            .unsigned()
            .references("id")
            .inTable("categorias")
            .onDelete("SET NULL")   // En caso de que se borre la categoria se pone a null
            .onUpdate("CASCADE")
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("comentarios", tbl => {
        tbl.increments().primary()
        tbl.string("text")
            .notNullable()
        tbl.float("valoracion", 2, 1)
            .notNullable()
            .defaultTo(0)
        tbl.integer("articulo_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("articulos")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.integer("usuario_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("usuarios")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("images", tbl => {
        tbl.increments().primary()
        tbl.string("nombre")
        tbl.string("url")
            .nullable()
        tbl.binary("image")
            .nullable()
        tbl.integer("articulo_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("articulos")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("pedidos", tbl => {
        tbl.increments().primary()
        tbl.date("fecha")
        tbl.integer("usuario_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("usuarios")
            .onDelete("RESTRICT")   // Para evitar que se borre un pedido si se borra el usuario
            .onUpdate("CASCADE")
        tbl.timestamps(true, true)
    })
/****************************************************************************/
    .createTable("linpeds", tbl => { // representa las lineas de los pedidos, cada linea es una tupla
        tbl.increments().primary()
        tbl.float("importe")
            .unsigned()
        tbl.integer("cantidad")
            .unsigned()
        tbl.integer("pedido_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("pedidos")
            .onDelete("CASCADE")    
            .onUpdate("CASCADE")
        tbl.integer("articulo_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("articulos")
            .onDelete("RESTRICT")   // Para evitar que se borre la linea de un pedido si se elimina un articulo
            .onUpdate("CASCADE")
        tbl.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    // NOTA: PARA BORRAR LAS TABLAS 
    // HAY QUE HACERLO EN EL ORDEN INVERSO
    return knex.schema
    .dropTableIfExists("linpeds")
    .dropTableIfExists("pedidos")
    .dropTableIfExists("images")
    .dropTableIfExists("comentarios")
    .dropTableIfExists("articulos")
    .dropTableIfExists("categorias")
    .dropTableIfExists("usuarios_direcciones")
    .dropTableIfExists("direcciones")
    .dropTableIfExists("usuarios")
    .dropTableIfExists("marcas")

};
