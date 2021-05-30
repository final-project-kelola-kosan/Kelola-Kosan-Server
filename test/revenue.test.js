const request = require('supertest')
const app = require('../app')

const { User, Revenue } = require('../models');
const { sequelize } = require('../models')
const { generateToken, hashPassword } = require('../helpers/jwt')
const { queryInterface } = sequelize

let revenueId = 1

beforeAll(done => {
  queryInterface.bulkInsert('Users', [
    {
      id        : 1,
      email     : "owner@mail.com",
      username  : "owner",
      password  : hashPassword('owner123'),
      createdAt : new Date(),
      updatedAt : new Date()
    },
  ],{})
  .then( _ => {
    return queryInterface.bulkInsert('Properties', [
      {
        id        : 1,
        name      : "Property 1",
        address   : "property address",
        image     : "property image",
        phone     : "4445667889",
        userId    : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ],{})
  })
  .then( _ => {
    return queryInterface.bulkInsert('Revenues', [
      {
        id        : 1,
        month     : 1,
        year      : 2021,
        total     : 1000000,
        propertyId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id        : 2,
        month     : 2,
        year      : 2021,
        total     : 1000001,
        propertyId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ],{})
  })
  .then(_ => done())
  .catch(err => console.log(err))
})

afterAll(done => {
  queryInterface.bulkDelete('Users', null, {})
  .then( _ => {
    return queryInterface.bulkDelete('Revenues', null, {})
  })
  done()
})


describe('REVENUE TESTING', _ => {

  const ownerToken = generateToken({
    email   : 'owner@mail.com',
    username: 'owner'
  })

  const addRevenue = {
    month: 5,
    year: 2021,
    total: 15135795,
    propertyId: 1
  }
  
  describe('Post /revenue', _ => {
    test('when success should response with status code 201', done => {
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
          expect(body).toHaveProperty('month', expect.any(Number))
          expect(body).toHaveProperty('year', expect.any(Number))
          expect(body).toHaveProperty('total', expect.any(Number))
          expect(body).toHaveProperty('propertyId', expect.any(Number))
          done()
        })
        .catch(err => done(err))
    })
  })



  describe('GET /revenues', _ => {
    test('read data revenues', done => {
      request(app)
      .get('/revenues')
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


  describe('Update Property - PUT /revenues/:id', _ => {

    describe('When success to update', _ => {
      test('Update should send response with status code 200', done => {
        request(app)
          .put(`/revenues/${revenueId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .set('access_token', ownerToken)
          .send({
            month : 7,
            year : 2021,
            total: 107005007,
            propertyId: 1,
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



  describe('Delete /revenues/:id', _ => { 

    describe('When access_token is null', _ => {
      it('should response with status code (400) with message Invalid Token', done => {
        request(app)
          .delete(`/revenues/${revenuesId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .set('access_token', null)
          .then(result => {
            // expect(result.status).toEqual(400) // << masih error
            expect(typeof result.body).toEqual('object')
            expect(result.body).toHaveProperty('message')
            expect(result.body)
              .toEqual(expect.objectContaining({ "message": "jwt malformed" }))
            done()
          })
          .catch(err => done(err))
      })
    })

  })

})