const request = require("supertest");
const server = require("../server").server;
const jwt = require("jwt-simple")
const moment = require("moment")

// **************  DATA SETTINGS ********************
const login = {
    email: "admin",
    password: "admin"
}
const adminPayload = { 
    id: 1,
    login: "admin",
    exp: moment().add(7,'days').valueOf(),
    rol: "admin"
}
const jwtEncodedResult = jwt.encode(adminPayload, "unencodedKey", 'HS512');
// ********** END DATA SETTINGS ********************

/**
 * Testing GET LOGIN endpoint
 */
describe("POST /api/auth/login", () => {
    it("Shoulds responds with jwt", (done) => {
        request(server)
            .post("/api/auth/login")
            .set("Accept", "application/json")
            .send(login)
            .expect("Content-Type", /json/)
            .expect(200, done)
    })
    
})