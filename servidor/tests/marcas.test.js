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
const singleMarca = {
    id: 2,
    marca: "marca1",
    created_at: "2020-11-02 05:05:39",
    updated_at: "2020-11-02 05:05:39"
  }

// ********** END DATA SETTINGS ********************
/**
 * Testing ADD MARCA
 */
describe("POST /marcas", () => {
    it('responds with 201 marca created and the id of the new marca', (done) => {
        request(server)
            .post("/marcas")
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ marca: singleMarca })
            .expect("Content-Type", /json/)
            .expect("2")
            .expect(201, done)
    })
})

/**
 * Testing GET ALL MARCAS endpoint
 */
describe("GET /marcas", () => {
    it('responds with json containing a list of all marcas', (done) => {
        request(server)
            .get("/marcas")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    })
})

/**
 * Testing GET single MARCA BY ID endpoint
 */
describe("GET /marcas/:id", () => {
    it("responds with json containing a single marca", (done) => {
        request(server)
            .get("/marcas/"+singleMarca.id)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(singleMarca)
            .expect(200, done)
    })
})

/**
 * Testing UPDATE MARCA endpoint
 */
describe("PATCH /marcas/:id", () => {
    var newDataMarca = singleMarca
    newDataMarca.marca = "marca2"
    it("responds with 200 and num of rows affected", (done) => {
        request(server)
            .patch("/marcas/"+singleMarca.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ changes: newDataMarca })
            .expect("Content-type", /json/)
            .expect("1")
            .expect(200, done)
    })
})

/**
 * Testing DELETE MARCA BY ID endpoint
 */
describe("DELETE /marcas/:id", () => {
    it("responds with 200 { message: \"Marca eliminada correctamente\" }", (done) => {
        request(server)
            .delete("/marcas/"+singleMarca.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect({ message: "Marca eliminada correctamente" })
            .expect(200, done)
    })
})



