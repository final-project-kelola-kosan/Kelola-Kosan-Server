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

let room105 = {
    number: "105",
    status: "occupied",
    propertyId: 1,
    type: "standard",
    price: 2500000
}

let room106 = {
    number: "106",
    status: "occupied",
    propertyId: 1,
    type: "standard",
    price: 2500000
}

const dateString = '2021-06-01'
var firstDate = new Date(dateString + "T00:00:00");
console.log(firstDate);

const dateStr2 = '2021-04-01'
var secondDate = new Date(dateStr2 + "T00:00:00");
console.log(secondDate);

let budi = {
    email: "budi@mail.com",
    name: "budi",
    phone: "90345212",
    checkIn: new Date(),
    checkOut: null,
}

let agung = {
    email: "agung@mail.com",
    name: "agung",
    phone: "14045",
    checkIn: new Date(),
    checkOut: null,
}

let adminToken = "";

beforeAll((done) => {
    queryInterface.bulkInsert("Users", [
        {
             id: 1,
             email: "maestro@mail.com",
             username: "maestro",
             password: bcrypt.hashSync("postgres", salt),
             createdAt: new Date(),
             updatedAt: new Date()
        }
    ], {})
    .then(() => {
         return request(app)
         .post("/login")
         .send(validUser)
         .set('Accept', 'application/json')
    })
    .then(response => {
         let {body, status} = response;
         adminToken = body.access_token;
 
        return queryInterface.bulkInsert("Properties", [
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
 
         
    })
    .then(_ => {
        return queryInterface.bulkInsert("Rooms", [
             {
                 id: 1,
                 number: "101",
                 status: "empty",
                 propertyId: 1,
                 type: "standard",
                 price: 2500000,
                 createdAt: new Date(),
                 updatedAt: new Date()
             }
         ], {}) 
    })
    .then(_ => {
        return queryInterface.bulkInsert("Tenants", [
            {
                id: 1,
                email: "maestro@mail.com",
                name: "maestro",
                phone: "1897234",
                checkIn: new Date(),
                checkOut: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            ], {}) 
        })
    .then(_ => {
        return queryInterface.bulkInsert("Payments", [
            {
                id: 1,
                month: 5,
                year: 2021,
                nextDueDate: firstDate,
                paidCash: 2500000,
                tenantId: 1,
                roomId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            ], {}) 
        })
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    })
 });

 afterAll((done) => {
    queryInterface.bulkDelete("Users", null, {})
        .then(() => {
            return queryInterface.bulkDelete("Properties", null, {})
        })
        .then(() => {
            return queryInterface.bulkDelete("Rooms", null, {})
        })
        .then(() => {
            return queryInterface.bulkDelete("Tenants", null, {})
        })
        .then(() => {
            return queryInterface.bulkDelete("Payments", null, {})
        })
        .then(() => {
            done();
        })
        .catch(err => {
            done(err);
        })
})

// Find Payments

describe("Show payments", () => {
    it("Find all payments", (done) => {
        request(app)
            .get('/payments')
            .set('Accept', 'application/json')
            .set("access_token", adminToken)
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(200);
                expect(body).toEqual(expect.any(Array));
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })

    it("Unauthenticate", (done) => {
        request(app)
            .get('/payments')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Unauthenticate")
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })
})

// Create Payment

