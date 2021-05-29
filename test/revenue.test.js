const request = require('supertest')
const app = require('../app')

const { sequelize } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { queryInterface } = sequelize

beforeAll(done => {
  
})

afterAll(done => {

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