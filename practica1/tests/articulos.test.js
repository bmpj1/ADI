const request = require("supertest");
const server = require("../server").server;
// "describe" se usa para agrupar varios test de una misma ruta)
// "it" se usa para realizar 1 test 

// **************  DATA SETTINGS ********************
//***** ADMIN ****/
const moment = require("moment")
const jwt = require("jwt-simple")
const adminPayload = { 
    id: 1,
    login: "admin",
    exp: moment().add(7,'days').valueOf(),
    rol: "admin"
}
const adminJWT = jwt.encode(adminPayload, "unencodedKey", "HS512")
//****************//
const singleCategoria = {
    id: 1,
    nombre: "articulo-categoria",
    created_at: "2020-11-02 05:05:39",
    updated_at: "2020-11-02 05:05:39"
  }
const singleMarca = {
    id: 1,
    marca: "articulo-marca",
    created_at: "2020-11-02 05:05:39",
    updated_at: "2020-11-02 05:05:39"
  }
const singleArticulo = {
    id: 1,
    codigo: 44414,
    nombre: "Articulo1",
    pvp: 777.77,
    detalles: "Articulo de prueba",
    valoracion: 5.5,
    marca_id: singleMarca.id,
    categoria_id: singleCategoria.id,
    created_at: "2020-11-02 18:03:50",
    updated_at: "2020-11-02 18:03:50"
  }
// ********** END DATA SETTINGS ********************
/**
 * Testing ADD ARTICULO
 */
describe("POST /articulos ", () => {
    it('responds with 201 marca created and the id of the new marca', (done) => {
        request(server)
            .post("/marcas")
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ marca: singleMarca })
            .expect("Content-Type", /json/)
            .expect(singleMarca.id.toString())
            .expect(201, done)
    })
    it('responds with 201 categoria created and the id of the new categoria', (done) => {
        request(server)
            .post("/categorias")
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ categoria: singleCategoria })
            .expect("Content-Type", /json/)
            .expect(singleCategoria.id.toString())
            .expect(201, done)
    })
    
    it('responds with 201 articulo created and the id of the new articulo', (done) => {
        request(server)
            .post("/articulos")
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ articulo: singleArticulo })
            .expect("Content-Type", /json/)
            .expect(singleArticulo.id.toString())
            .expect(201, done)
    })
})

/**
 * Testing GET ALL ARTICULOS endpoint
 */
describe("GET /articulos", () => {
    it('responds with json containing a list of all articulos', (done) => {
        request(server)
            .get("/articulos")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    })
})

/**
 * Testing GET single ARTICULO BY ID endpoint
 */
describe("GET /articulos/:id", () => {
    it("responds with json containing a single articulo", (done) => {
        request(server)
            .get("/articulos/"+singleArticulo.id)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    })
})

/**
 * Testing UPDATE ARTICULO endpoint
 */
describe("PATCH /articulos/:id", () => {
    var newDataArticulo = singleArticulo
    newDataArticulo.nombre = "articulo2"
    it("responds with 200 and num of rows affected", (done) => {
        request(server)
            .patch("/articulos/"+singleArticulo.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ changes: newDataArticulo })
            .expect("Content-type", /json/)
            .expect("1")
            .expect(200, done)
    })
})

/**
 * Testing DELETE ARTICULO BY ID endpoint
 */
describe("DELETE /articulos/:id", () => {
    it("responds with 200 { message: \"Marca eliminada correctamente\" }", (done) => {
        request(server)
            .delete("/marcas/"+singleMarca.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect({ message: "Marca eliminada correctamente" })
            .expect(200, done)
    })
    it("responds with 200 { message: \"Categoria eliminada correctamente\" }", (done) => {
        request(server)
            .delete("/categorias/"+singleCategoria.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect({ message: "Categoria eliminada correctamente" })
            .expect(200, done)
    })
    
    it("responds with 200 { message: \"Articulo eliminado correctamente\" }", (done) => {
        request(server)
            .delete("/articulos/"+singleArticulo.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect({ message: "Articulo eliminado correctamente" })
            .expect(200, done)
    })
})



