const request = require('supertest')
const app = require('../app.js')
const { hashPassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt')
const { User, Tenant } = require('../models');
const { sequelize } = require('../models')
const tenant = require('../models/tenant.js')
const { queryInterface } = sequelize

let idTenant

beforeAll((done) => {
  queryInterface.bulkInsert('Users', [{
    email: "admin@mail.com",
    username: 'admin',
    password: hashPassword('admin'),
    createdAt: new Date(),
    updatedAt: new Date(),
  }],
    { returning: true })

    .then((res) => {
      res?.map((el => {
        let obj = {
          id: el.id,
          email: el.email,
        }
        access_token = generateToken(obj)
        // done();
      }))
    })
    .then(res => {
      return Tenant.create({
        email: 'pengunjung@mail.com',
        name: 'customer',
        phone: '0812382620',
        checkIn: "2021-03-12",
        checkOut: "2021-04-12",
      })
    })
    .then(res => {
      idTenant = res.id
      done()
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



describe("test tenant's CRUD section", () => {

  describe("test create tenant", () => {
    describe("success create tenant", () => {
      test("success create tenant test", (done) => {
        request(app)
          .post('/tenant')
          .set('access_token', `${access_token}`)
          .send({
            email: 'pengunjun8@customer.com',
            name: 'customer',
            phone: '0812382620',
            checkIn: "2021-03-12",
            checkOut: "2021-04-12",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then(res => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty("id", res.body.id)
            expect(res.body).toHaveProperty("email", res.body.email)
            expect(res.body).toHaveProperty("name", res.body.name)
            expect(res.body).toHaveProperty("phone", res.body.phone)
            expect(res.body).toHaveProperty("checkIn", res.body.checkIn)
            expect(res.body).toHaveProperty("checkOut", res.body.checkOut)
            expect(res.body).toHaveProperty("createdAt", res.body.createdAt)
            expect(res.body).toHaveProperty("updatedAt", res.body.updatedAt)
            done()
          })
      })
    })


    describe("error create tenant function", () => {
      test.only("error empty create tenant test", (done) => {
        request(app)
          .post('/tenant')
          .set('access_token', `${access_token}`)
          .send({
            email: '',
            name: '',
            phone: '',
            checkIn: "",
            checkOut: "",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then(res => {
            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
              "errors": [
                "Email is invalid",
                "email musn't be empty",
                "name musn't be empty",
                "phone musn't be empty",
                "checkIn musn't be empty",
                "checkOut musn't be empty",
              ],
              "message": "Sequelize Validation Error",
            })
            done()
          })
      })


      test("error empty contain in phone, checkIn, checkOut in create tenant test", (done) => {
        request(app)
          .post('/tenant')
          .set('access_token', `${access_token}`)
          .send({
            email: 'cust12@mail.com',
            name: 'custom12',
            phone: '',
            checkIn: "",
            checkOut: "",
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
              "errors": [
                "phone musn't be empty",
                "checkIn musn't be empty",
                "checkOut musn't be empty",
              ],
              "message": "Bad request",
            })
            done()
          })
      })


      test("error empty contain in phone create tenant test 2", (done) => {
        request(app)
          .post('/tenant')
          .set('access_token', `${access_token}`)
          .send({
            email: 'cust12@mail.com',
            name: 'custom12',
            phone: '',
            checkIn: "2021-03-12",
            checkOut: "2021-04-12",
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
              "errors": [
                "phone musn't be empty",
              ],
              "message": "Bad request",
            })
            done()
          })
      })

    })
  })



  describe("test for read lists", () => {
    describe("test for read lists in tenant", () => {
      test("success read tenant test", (done) => {
        request(app)
          .get('/tenant')
          .set('access_token', `${access_token}`)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("id", res.body.id)
            expect(res.body).toHaveProperty("email", res.body.email)
            expect(res.body).toHaveProperty("name", res.body.name)
            expect(res.body).toHaveProperty("phone", res.body.phone)
            expect(res.body).toHaveProperty("checkIn", res.body.checkIn)
            expect(res.body).toHaveProperty("checkOut", res.body.checkOut)
            done()
          })
      })
    })
  })


  describe("test for get list by id", () => {
    describe("test for get list by id in tenant", () => {
      test("success get list tenant test", (done) => {
        request(app)
          .get(`/tenant/${idTenant}`)
          .set('access_token', `${access_token}`)
          .end((err, res) => {
            if (err) {
              console.log(">>>>>", err, res, "<<<<")
              return done(err)
            }

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("email", res.body.email)
            expect(res.body).toHaveProperty("name", res.body.name)
            expect(res.body).toHaveProperty("phone", res.body.phone)
            expect(res.body).toHaveProperty("checkIn", res.body.checkIn)
            expect(res.body).toHaveProperty("checkOut", res.body.checkOut)
            done()
          })
      })
    })


    describe("error test for get list by id in tenant without access token", () => {
      test("get list by id in tenant test without access_token", (done) => {
        request(app)
          .get(`/tenant/${idTenant}`)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("message", "Unauthenticate")
            done()
          })
      })
    })


    describe("error test for get list by id in tenant with riddiculous id", () => {
      test("get list by riddiculous id in tenant test", (done) => {
        request(app)
          .get(`/tenant/999`)
          .set('access_token', `${access_token}`)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            // console.log(res.body);
            expect(res.status).toBe(500)
            expect(res.body).toHaveProperty("email", res.body.email)
            expect(res.body).toHaveProperty("name", res.body.name)
            expect(res.body).toHaveProperty("phone", res.body.phone)
            expect(res.body).toHaveProperty("checkIn", res.body.checkIn)
            expect(res.body).toHaveProperty("checkOut", res.body.checkOut)
            expect(res.body).toHaveProperty("createdAt", res.body.createdAt)
            expect(res.body).toHaveProperty("updatedAt", res.body.updatedAt)
            done()
          })
      })
    })

  })


  describe("test for update list by id", () => {
    describe("test for update list by id in tenant", () => {
      test("success update list tenant test", (done) => {
        request(app)
          .put(`/tenant/${idTenant}`)
          .set('access_token', `${access_token}`)
          .send({
            email: 'customerr@cust.com',
            name: 'customer12',
            phone: '0812382320',
            checkIn: "2021-02-12",
            checkOut: "2021-03-12",
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("id", res.body.id)
            expect(res.body).toHaveProperty("email", res.body.email)
            expect(res.body).toHaveProperty("name", res.body.name)
            expect(res.body).toHaveProperty("phone", res.body.phone)
            expect(res.body).toHaveProperty("checkIn", res.body.checkIn)
            expect(res.body).toHaveProperty("checkOut", res.body.checkOut)
            expect(res.body).toHaveProperty("createdAt", res.body.createdAt)
            expect(res.body).toHaveProperty("updatedAt", res.body.updatedAt)
            done()
          })
      })
    })


    describe("error test for update list by id in tenant without access_token", () => {
      test("update list tenant without access_token ", (done) => {
        request(app)
          .put(`/tenant/${idTenant}`)
          .send({
            email: 'custo11rr@cust.com',
            name: 'customer12',
            phone: '0812382320',
            checkIn: "2021-02-12",
            checkOut: "2021-03-12",
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("message", "Unauthenticate")
            done()
          })
      })
    })

    describe("error test for update list by id in tenant with empty list", () => {
      test("update list empty contain in tenant test ", (done) => {
        request(app)
          .put(`/tenant/${idTenant}`)
          .set('access_token', `${access_token}`)
          .send({
            email: '',
            name: '',
            phone: '',
            checkIn: "",
            checkOut: "",
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
              "errors": [
                "Email is invalid",
                "email musn't be empty",
                "name musn't be empty",
                "phone musn't be empty",
                "checkIn musn't be empty",
                "checkOut musn't be empty",
              ],
              "message": "Bad request",
            })
            done()
          })
      })
    })


    describe("error test for update list by id in tenants with half empty list", () => {
      test("update list empty contain in tenant at phone, checkIn, checkOut", (done) => {
        request(app)
          .put(`/tenant/${idTenant}`)
          .set('access_token', `${access_token}`)
          .send({
            email: 'cust12@mail.com',
            name: 'custom12',
            phone: '',
            checkIn: "",
            checkOut: "",
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
              "errors": [
                "phone musn't be empty",
                "checkIn musn't be empty",
                "checkOut musn't be empty",
              ],
              "message": "Bad request",
            })
            done()
          })
      })
    })



    describe("error test for update list by id in tenants with half empty list", () => {
      test("update list empty contain in tenant at phone", (done) => {
        request(app)
          .put(`/tenant/${idTenant}`)
          .set('access_token', `${access_token}`)
          .send({
            email: 'cust12@mail.com',
            name: 'custom12',
            phone: '',
            checkIn: "2021-02-12",
            checkOut: "2021-03-12",
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
              "errors": [
                "phone musn't be empty",
              ],
              "message": "Bad request",
            })
            done()
          })
      })
    })



  })

  describe("test for delete list by id", () => {
    describe("test for delete list by id in tenant", () => {
      test("success delete list tenant test", (done) => {
        request(app)
          .delete(`/tenant/${idTenant}`)
          .set('access_token', `${access_token}`)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("message", `Tenant successfully deleted`)
            done()
          })
      })
    })

    describe("error test for delete list by id in tenant", () => {
      test("error delete list with riddiculous id Tenant test", (done) => {
        request(app)
          .delete(`/tenant/999`)
          .set('access_token', `${access_token}`)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            expect(res.status).toBe(500)
            expect(res.body).toHaveProperty("message", `error not found`)
            done()
          })
      })
    })

  })


})