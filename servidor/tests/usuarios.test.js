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
const singleUser = {
    id: 2,
    email: "bmpj1@gmail.ess",
    password: "PasswordDePRUEBA123",
    nombre: "Brian Mathias",
    apellidos: "Pesci Juliani",
    telefono: "644457371",
    fechaNac: "1994-08-05",
    rol: "1",
    created_at: "2020-11-02 05:05:39",
    updated_at: "2020-11-02 05:05:39"
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

  const pagination = {
    total: 2,
    lastPage: 1,
    perPage: 10,
    currentPage: 1,
    from: 0,
    to: 2
  }

// ********** END DATA SETTINGS ********************
/**
 * Testing ADD USER
 */
describe("POST /usuarios", () => {
    it('responds with 201 user created and the id of the new user', (done) => {
        request(server)
            .post("/usuarios")
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ usuario: singleUser })
            .expect("Content-Type", /json/)
            .expect(singleUser.id.toString())
            .expect(201, done)
    })
})

/**
 * Testing GET ALL USERS endpoint
 */
describe("GET /usuarios", () => {
    it('responds with json containing a list of all users', (done) => {
        request(server)
            .get("/usuarios")
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(/*{ data:*/[admin, singleUser]/*, pagination: pagination }*/)
            .expect(200, done)
    })
})

/**
 * Testing GET single USER BY ID endpoint
 */
describe("GET /usuarios/:id", () => {
    it("responds with json containing a single user", (done) => {
        request(server)
            .get("/usuarios/"+singleUser.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect({
                id: 2,
                email: "bmpj1@alu.ua.es",
                nombre: "Brian Mathias",
                apellidos: "Pesci Juliani",
                telefono: "644457371",
                fechaNac: "1994-08-05",
                rol: "1",
                created_at: "2020-11-02 05:05:39",
                updated_at: "2020-11-02 05:05:39"
              })
            .expect(200, done)
    })
})

/**
 * Testing UPDATE USER endpoint
 */
describe("PATCH /usuarios/:id", () => {
    var newDataUser = singleUser
    newDataUser.email = "bmpj1@alu.ua.es"
    it("responds with 200 and num of rows affected", (done) => {
        request(server)
            .patch("/usuarios/"+singleUser.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .send({ changes: newDataUser })
            .expect("Content-type", /json/)
            .expect("1")
            .expect(200, done)
    })
})

/**
 * Testing DELETE USER BY ID endpoint
 */
describe("DELETE /usuarios/:id", () => {
    it("responds with 200 { message: \"Usuario eliminado correctamente\" }", (done) => {
        request(server)
            .delete("/usuarios/"+singleUser.id)
            .set("Authorization", "bearer " + adminJWT)
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect({ message: "Usuario eliminado correctamente" })
            .expect(200, done)
    })
})



