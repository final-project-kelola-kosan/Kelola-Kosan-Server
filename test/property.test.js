// TEST REVENUE
const request = require('supertest')
const app = require('../app')
// const { Property, sequelize } = require('../models')
// const { queryInterface } = sequelize

/**
 * name
 * address
 * image
 * phone
 * userId
 */

// beforeAll(done => {
//   queryInterface.bulkInsert('Properties', [
//     {
//       name : "Test Nama Kos",
//       address : "Test Lokasi Kos",
//       image: "test image_url",
//       phone: "085199997777",
//       userId: "1",
//       createdAt : new Date(),
//       updatedAt : new Date()
//     }
//   ])
//   done()
// })

// afterAll(done => {
//   Property
//     .destroy({ truncate: true, restartIdentity: true })
//     .then(_ => done())
//     .catch(err => done(err))
// })

describe('PROPERTY', _ => {
  const testAddProperty = {
    name : "Test Nama Kos",
    address : "Test Lokasi Kos",
    image: "test image_url",
    phone: "085199997777",
    userId: "1",
  }
  describe('Add new Property', _ => {
    test('when success should send response with status code 201', done => {
      request(app)
        .post('/properties')
        .send(testAddProperty)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .set('access_token', adminToken)
        // .auth('role', 'owner')
        .then(response => {
          const { status, body } = response
          expect(status).toEqual(201)
          expect(typeof body).toEqual('object')  
          expect(body).toHaveProperty('name', expect.any(String))
          expect(body).toHaveProperty('address', expect.any(String))
          expect(body).toHaveProperty('image', expect.any(String))
          expect(body).toHaveProperty('phone', expect.any(String))
          expect(body).toHaveProperty('useId', expect.any(Number))
          done()
        })
        .catch(err => done(err))
      })
  })

  // describe('GET /properties', _ => {
  //   test('read data property', done => {
  //     request(app)
  //     .get('/properties')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .send({
  //       name : "Rumah Kost Test",
  //       address : "Test Lokasi Kos",
  //       image: "test image_url",
  //       phone: "085299997777",
  //       userId: "10"
  //     })
  //     .expect(200)
  //     .then(response => {
  //       let { body } = response
  //       expect(typeof body).toEqual('object')
  //       expect(body).toHaveProperty('name', expect.any(String))
  //       expect(body).toHaveProperty('address', expect.any(String))
  //       expect(body).toHaveProperty('image', expect.any(String))
  //       expect(body).toHaveProperty('phone', expect.any(String))
  //       expect(body).toHaveProperty('userId', expect.any(Number))
  //       done()
  //     })
  //     .catch(err => done(err))
  //   })
  // })

})