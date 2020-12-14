const request = require("supertest");
const server = require("../server").server;

// "describe" se usa para agrupar varios test de una misma ruta)
// "it" se usa para realizar 1 test 

/**
 * Testing home
 */
describe("GET /", () => {
    it('Home responds with json', (done) => {
        request(server)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    })
})