const request = require('supertest')
const app = require('../app.js')
const {hashPassword} = require('../helpers/bcrypt.js')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

beforeAll((done) => {
    queryInterface.bulkInsert('Users', [{
    email: "admin@mail.com",
    username: 'admin',
    password: hashPassword('admin'),
    createdAt: new Date(),
    updatedAt: new Date(),
    }])
    .then(() => {
        done();
    })
    .catch((err) => {
        done(err);
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
    .then(() => {
        done()
    })
    .catch((err) => {
        done(err);
    })
})

describe("test for user's section", () => {

    describe("test register admin function", () => {
        describe("success register admin function", () => {
            test("success register admin", (done) => {
                request(app)
                .post('/register')
                .send({
                    email: 'admin1@gmail.com',
                    username: 'admin1',
                    password: '123456',
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.body).toHaveProperty('username', "admin1")
                    expect(res.body).toHaveProperty('email', "admin1@gmail.com")
                    expect(res.status).toBe(201)
                    done()
                })
            })
        })

        describe("failed register admin function", () => {
            test("failed register admin test cause unique email", (done) => {
                request(app)
                .post('/register')
                .send({
                    email: 'admin1@gmail.com',
                    username: 'admin1',
                    password: '123456',
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body).toStrictEqual({
                        "errors": ["Email already exist"], "message": "Bad Request"
                    })
                    done()
                })
            })


            test("failed register admin test cause empty", (done) => {
                request(app)
                .post('/register')
                .send({
                    email: '',
                    username: '',
                    password: '',
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body).toStrictEqual({
                        "errors": [
                            "Email is invalid",
                            "email musn't be empty",
                            "username musn't be empty",
                            "password musn't be empty",
                            "password minimal length is 5",
                          ],
                          "message": "Bad request",
                        },
                    
                    )
                    done()
                })
            
            })


            test("failed register admin test cause incorrect email", (done) => {
                request(app)
                .post('/register')
                .send({
                    email: 'hello@',
                    username: 'admin',
                    password: 'admin',
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body).toStrictEqual({
                      "errors": [
                        "Email is invalid",
                    ], 
                      "message": "Bad request"
                    }, )
                    done()
                })
            })
        })
    })


    describe("test login function", () => {
        describe("success login function", () => {
            test("success login admin test with correct email and password", (done) => {
                request(app)
                .post('/login')
                .send({
                    email: "admin@mail.com",
                    password: 'admin',
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.body).toHaveProperty("access_token")
                    expect(res.body.access_token).not.toBeNull()
                    expect(res.status).toBe(200)
                    done()
                })
            })
        })


        describe("failed login function", () => {
            test("failed email login admin test with incorrect email or password", (done) => {
                request(app)
                .post('/login')
                .send({
                    email: "adminAA",
                    password: 'admin',
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.status).toBe(500)
                    expect(res.body).toStrictEqual({"message": "email or password incorrect"})
                    expect(res.body.access_token).not.toBeNull()
                    done()
                })
            })

            test("failed email login admin test with empty email or password", (done) => {
                request(app)
                .post('/login')
                .send({
                    email: "",
                    password: ''
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.status).toBe(500)
                    expect(res.body).toStrictEqual({"message": "email or password incorrect"})
                    done()
                })
            })

        })
    })

})