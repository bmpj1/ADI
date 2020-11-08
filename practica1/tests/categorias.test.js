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
    id: 2,
    nombre: "categoria1",
    created_at: "2020-11-02 05:05:39",
    updated_at: "2020-11-02 05:05:39"
  }

// ********** END DATA SETTINGS ********************
/**
 * Testing ADD CATEGORIA
 */
describe("POST /categorias", () => {
    it('responds with 201 categoria created and the id of the new categoria', (done) => {
        request(server)
            .post("/categorias")
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ categoria: singleCategoria })
            .expect("Content-Type", /json/)
            .expect("2")
            .expect(201, done)
    })
})

/**
 * Testing GET ALL CATEGORIAS endpoint
 */
describe("GET /categorias", () => {
    it('responds with json containing a list of all categorias', (done) => {
        request(server)
            .get("/categorias")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    })
})

/**
 * Testing GET single CATEGORIA BY ID endpoint
 */
describe("GET /categorias/:id", () => {
    it("responds with json containing a single categoria", (done) => {
        request(server)
            .get("/categorias/"+singleCategoria.id)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(singleCategoria)
            .expect(200, done)
    })
})

/**
 * Testing UPDATE CATEGORIA endpoint
 */
describe("PATCH /categorias/:id", () => {
    var newDataCategoria = singleCategoria
    newDataCategoria.nombre = "categoria2"
    it("responds with 200 and num of rows affected", (done) => {
        request(server)
            .patch("/categorias/"+singleCategoria.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ changes: newDataCategoria })
            .expect("Content-type", /json/)
            .expect("1")
            .expect(200, done)
    })
})

/**
 * Testing DELETE CATEGORIA BY ID endpoint
 */
describe("DELETE /categorias/:id", () => {
    it("responds with 200 { message: \"Categoria eliminada correctamente\" }", (done) => {
        request(server)
            .delete("/categorias/"+singleCategoria.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect({ message: "Categoria eliminada correctamente" })
            .expect(200, done)
    })
})



