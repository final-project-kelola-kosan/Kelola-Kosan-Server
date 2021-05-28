const request = require("supertest");
const app = require("../app.js");
const {sequelize} = require("../models");
const {queryInterface} = sequelize;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

let validUser = {
    email: "maestro@mail.com",
    username: "maestro",
    password: "postgres"
}


let validProperty = {
    name: "Wisma Rembulan",
    address: "Pasar Minggu",
    image: "blabla",
    phone: "14256",
    userId: 1
}


let room105 = {
    number: "105",
    status: "empty",
    propertyId: 1,
    type: "standard",
    price: 2150500
}

let adminToken = "";

beforeAll((done) => {
    queryInterface.bulkInsert("Properties", [
        {
            id: 1,
            name: "Wisma Rembulan",
            address: "Pasar Minggu",
            image: "blabla",
            phone: "14256",
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
    .then(() => {
        done()
    })
    .catch(err => {
        done(err);
    })
});

afterAll((done) => {
    queryInterface.bulkDelete("Properties", null, {})
        .then(() => {
            done();
        })
        .catch(err => {
            done(err);
        })
})

describe("get /rooms", () => {
    it("creating new room", (done) => {
        request(app)
            .get('/rooms')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                console.log(body)
                expect(status).toBe(201);

                done()
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    });
});







// then(_ => {
    //     return queryInterface.bulkInsert("Properties", [
    //         {
    //             id: 1,
    //             name: "Wisma Rembulan",
    //             address: "Pasar Minggu",
    //             image: "blabla",
    //             phone: "14256",
    //             userId: 1
    //         }
    //     ], {})
    // })
    // .then(_ => {
    //     return queryInterface.bulkInsert("Rooms", [
    //         {
    //             id: 1,
    //             number: "105",
    //             status: "empty",
    //             propertyId: 1,
    //             type: "standard",
    //             price: 2150500
    //         }
    //     ])
    // })
    // .then(_ => {
    //     return request(app)
    //         .post("/login")
    //         .send(validUser)
    //         .set('Accept', 'application/json')
    // })
    // .then(response => {
    //     let {body, status} = response;
    //     let access_token = body.access_token;
    //     console.log(access_token)
    //     done();
    // })

