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
                number: "105",
                status: "empty",
                propertyId: 1,
                type: "standard",
                price: 2150500,
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
            done();
        })
        .catch(err => {
            done(err);
        })
})

describe("get /rooms", () => {
    it("get all rooms", (done) => {
        request(app)
            .get('/rooms')
            .set('Accept', 'application/json')
            .set("access_token", adminToken)
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(200);
                expect(body).toEqual(expect.any(Array));
                done()
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    });
});

let newRoom = {
    number: 115,
    status: "maintenance",
    type: "standard",
    price: "2500000"
}

describe("Create new room /rooms", () => {
    // success
    it("Adding new room", (done) => {
        request(app)
            .post("/rooms")
            .send(newRoom)
            .set('Accept', 'application/json')
            .set("access_token", adminToken)
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(201);
                expect(body).toHaveProperty("number", 115);
                expect(body).toHaveProperty("status", "maintenance");
                expect(body).toHaveProperty("type", "standard");
                expect(body).toHaveProperty("price", "2500000");
                done()
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })

    // WITHOUT ACCESS TOKEN
    it("Unauthenticate", (done) => {
        request(app)
            .post("/rooms")
            .send(newRoom)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(400);
                done()
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })

});

const testId = 1;

describe("Get room by id", () => {
    it("detail room", (done) => {
        request(app)
            .get(`/rooms/${testId}`)
            .set('Accept', 'application/json')
            .set("access_token", adminToken)
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty("number", 105);
                expect(body).toHaveProperty("status", "empty");
                expect(body).toHaveProperty("type", "standard");
                expect(body).toHaveProperty("price", 2150500);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })

    // no access token
    it("no access token", (done) => {
        request(app)
            .get(`/rooms/${testId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(400);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })

    // wrong id
    it("wrong id", (done) => {
        request(app)
            .get(`/rooms/${2}`)
            .set('Accept', 'application/json')
            .set("access_token", adminToken)
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(404);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })
});

// STATUS UPDATE

describe("Status Update", () => {
    it("Update status", (done) => {
        request(app)
            .patch(`/rooms/${testId}`)
            .set('Accept', 'application/json')
            .set("access_token", adminToken)
            .send({
                status: "occupied"
            })
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty("msg", "Status successfully updated");
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })

    it("No Access Token", (done) => {
        request(app)
            .patch(`/rooms/${testId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(400);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })

    it("Room Not Found", (done) => {
        request(app)
            .patch(`/rooms/${5}`)
            .set('Accept', 'application/json')
            .set("access_token", adminToken)
            .expect('Content-Type', /json/)
            .then(response => {
                let {body, status} = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Room Not Found");

                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
    })

})

// UPDATE ROOM

let updateData = {
    number: 201,
    status: "maintenance",
    type: "deluxe",
    price: 3500000
}

describe("Update Room", () => {
    it("Update room", (done) => {
        request(app)
        .put(`/rooms/${testId}`)
        .send(updateData)
        .set('Accept', 'application/json')
        .set("access_token", adminToken)
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("msg", "Room successfully updated");
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })       
    })

    it("Unauthenticate", (done) => {
        request(app)
        .put(`/rooms/${testId}`)
        .send(updateData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Unauthenticate");
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })       
    })

    it("Room Not Found", (done) => {
        request(app)
        .put(`/rooms/${5}`)
        .send(updateData)
        .set("access_token", adminToken)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Room Not Found");
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })       
    })

})

describe("Deleting Room", () => {
    it("Success deleting room", (done) => {
        request(app)
        .delete(`/rooms/${testId}`)
        .set('Accept', 'application/json')
        .set("access_token", adminToken)
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("msg", "Room successfully deleted");
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })    
    })

    it("Unauthenticate", (done) => {
        request(app)
        .delete(`/rooms/${testId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Unauthenticate");
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })    
    })

    it("Room Not Found", (done) => {
        request(app)
        .delete(`/rooms/${5}`)
        .set('Accept', 'application/json')
        .set("access_token", adminToken)
        .expect('Content-Type', /json/)
        .then(response => {
            let {body, status} = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Room Not Found");
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })    
    })
})





