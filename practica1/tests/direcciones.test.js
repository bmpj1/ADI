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
const singleDireccion = {
    id: 1,
    linea1: "calle1",
    linea2: "calle2",
    cod_postal: "03004",
    created_at: "2020-11-02 05:05:39",
    updated_at: "2020-11-02 05:05:39"
  }

// ********** END DATA SETTINGS ********************
/**
 * Testing ADD MARCA
 */
describe("POST /usuarios/:id/direcciones", () => {
    it('responds with 201 direccion created and the id of the new direccion', (done) => {
        request(server)
            .post("/usuarios/:id/direcciones")
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ direccion: singleDireccion })
            .expect("Content-Type", /json/)
            .expect("1")
            .expect(201, done)
    })
})

/**
 * Testing GET ALL DIRECCIONES FROM SINGLE USER endpoint
 */
describe("GET /usuarios/:id/direcciones", () => {
    it('responds with json containing a list of all direcciones from a single user', (done) => {
        request(server)
            .get("/usuarios/1/direcciones")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect([singleDireccion])
            .expect(200, done)
    })
})

/**
 * Testing GET single DIRECCION BY ID endpoint
 */
describe("GET /direcciones/:id", () => {
    it("responds with json containing a single marca", (done) => {
        request(server)
            .get("/marcas/"+singleDireccion.id)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(singleDireccion)
            .expect(200, done)
    })
})

/**
 * Testing UPDATE DIRECCIONES endpoint
 */
describe("PATCH /direcciones/:id", () => {
    var newDataDireccion = singleDireccion
    newDataDireccion.linea1 = "nueva calle"
    it("responds with 200 and num of rows affected", (done) => {
        request(server)
            .patch("/marcas/"+singleDireccion.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ changes: newDataDireccion })
            .expect("Content-type", /json/)
            .expect("1")
            .expect(200, done)
    })
})

/**
 * Testing DELETE MARCA BY ID endpoint
 */
describe("DELETE /direcciones/:id", () => {
    it("responds with 200 { message: \"Marca eliminada correctamente\" }", (done) => {
        request(server)
            .delete("/marcas/"+singleDireccion.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect({ message: "Marca eliminada correctamente" })
            .expect(200, done)
    })
})



