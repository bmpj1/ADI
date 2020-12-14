const request = require("supertest");
const server = require("../server").server;
const jwt = require("jwt-simple")
const moment = require("moment")

// **************  DATA SETTINGS ********************
const adminLogin = {
    email: "admin",
    password: "admin"
}
const admin = {
    id: 1,
    email: "admin",
    password: "admin",
    nombre: "admin",
    apellidos: "admin",
    telefono: "admin",
    fechaNac: "1994-08-05",
    rol: "admin",
    created_at: "2020-11-02 05:05:39",
    updated_at: "2020-11-02 05:05:39"
  }

const adminPayload = { 
    id: 1,
    login: "admin",
    exp: moment().add(7,'days').valueOf(),
    rol: "admin"
}
const adminJWT = "BEARER " + jwt.encode(adminPayload, "unencodedKey", "HS512")

// ********** END DATA SETTINGS ********************

/**
 * Testing GET LOGIN endpoint
 */
describe("CRATE ADMIN /login", () => {
    it('responds with 201 user created and the id of the new ADMIN', (done) => {
        request(server)
            .post("/usuarios")
            .set("authorization", adminJWT)
            .set("Accept", "application/json")
            .send({usuario: admin })
            .expect("Content-Type", /json/)
            .expect(admin.id.toString())
            .expect(201, done)
    })
})