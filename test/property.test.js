const request = require('supertest')
const app = require('../app')

const { Property, User, sequelize } = require('../models')
const { hashPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { queryInterface } = sequelize


let propertyId = 0

beforeAll((done) => {
  queryInterface.bulkInsert('Users', [
    {
      id        : 1,
      email     : "owner@mail.com",
      username  : "owner",
      password  : hashPassword('owner123'),
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ],{})
  .then(_=>{
    return queryInterface.bulkInsert('Properties', [
      {
        name : "Test Update",
        address : "Test Address Update",
        image: "test image_url update",
        phone: "085199997777",
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Test delete",
        address : "Test Address delete",
        image: "test image_url delete",
        phone: "085199997777",
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ],{})
    
  })
  .then(_ => { done() })
  .catch(err => done(err))
})

afterAll((done) => {
  queryInterface.bulkDelete('Users', null, {})
  .then(_ => {
    return queryInterface.bulkDelete('Properties', null, {})
  })
  .then(_ => { done()})
  .catch(err => done(err))
  done()
})

describe('PROPERTY TESTING', _ => {

  const ownerToken = generateToken({
    email   : 'owner@mail.com',
    username: 'owner'
  })

  const testAddProperty = {
    name : "add name property",
    address : "add location property",
    image: "add image url",
    phone: "088899995555",
    userId: 1,
  }

  describe('Add new Property - POST /properties', _ => {
    test('when success should send response with status code 201', done => {
      request(app)
        .post('/properties')
        .set('Accept', 'application/json')
        .set('access_token', ownerToken)
        .expect('Content-Type', /json/)
        .send(testAddProperty)
        .then(response => {
          const { status, body } = response
          expect(status).toEqual(201)
          expect(typeof body).toEqual('object')
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', expect.any(String))
          expect(body).toHaveProperty('address', expect.any(String))
          expect(body).toHaveProperty('image', expect.any(String))
          expect(body).toHaveProperty('phone', expect.any(String))
          expect(body).toHaveProperty('userId', expect.any(Number))
          propertyId = body.id
          done()
        })
        .catch(err => done(err))
      })

  })

  describe('GET /properties', _ => {
    test('read data property', done => {
      request(app)
      .get('/properties')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .set('access_token', ownerToken)
      .expect(200)
      .then(response => {

        let { body } = response
        expect(body).toEqual(expect.any(Array))
        done()
      })
      .catch(err => done(err))
    })
  })


  describe('Update Property - PUT /properties/:id', _ => {

    const ownerToken = generateToken({ 
      email   : 'owner@mail.com',
      username: 'owner'
    })

    describe('When success to update', _ => {
      test('Update should send response with status code 200', done => {
        request(app)
          .put(`/properties/${propertyId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .set('access_token', ownerToken)
          // .auth('role', 'owner')
          .send({
            name : "add name property",
            address : "add location property",
            image: "add image url",
            phone: "088899995555",
          })
          .then(result => {
            expect(result.status).toEqual(200)
            expect(typeof result.body).toEqual('object')
            expect(result.body).toHaveProperty('updated')
            done()
          })
          .catch(err => done(err))
      })


    })

  })


  describe('Delete /properties/:id', _ => {

    const owenerToken = generateToken({ 
      username: 'owner',
      email   : 'owner@mail.com'
    })
    
    describe('When success delete', _ => {

      test('should successfully get status 200', done => {
        request(app)
        .delete(`/properties/${propertyId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .set('access_token', ownerToken)
        // .auth('role', 'owner')
      })
      .then(result => {
        expect(result.status).toEqual(200)
        expect(typeof result.body).toEqual('object')
        expect(result.body).toHaveProperty('message')
        expect(result.body)
          .toEqual(expect.objectContaining({ message: 'Property has been delete!' }))
        done()
      })
      .catch(err => done(err))

    })

  })

})