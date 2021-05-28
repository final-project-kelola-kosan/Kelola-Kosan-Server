const request = require('supertest')
const app = require('../app.js')
const {hashPassword} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

//beforeAll seperti hooks
// sebelum dijalankan semuanya
beforeAll((done) => {
    queryInterface.bulkInsert('Users', [{
    name: 'admin',
    email: "admin@mail.com",
    password: hashPassword('admin'),
    createdAt: new Date(),
    updatedAt: new Date(),
    }], 
    {returning: true})

    .then((res) => {
        let obj = {
            id: res.id,
            email: res.email,
        }
        access_token = generateToken(obj)
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

describe("test product's CRUD section", () => {

    describe("test create product function", () => {
      describe("success create product function", () => {
        test("success create product test", (done) => {
          request(app)
          .post('/products')
          .set('access_token', `${access_token}`)
          .send({
            name: 'PlayStation 5',
            image_url: 'https://asset.kompas.com/crops/OShkHBI40cCFj6mMFFcYmhbhBaw=/187x12:1126x638/750x500/data/photo/2020/06/12/5ee2bae6901d6.jpg',
            price: 50000,
            stock: 12,
            category: 'games',
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then(res => {
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty("name" , 'PlayStation 5')
                expect(res.body).toHaveProperty("image_url" , 'https://asset.kompas.com/crops/OShkHBI40cCFj6mMFFcYmhbhBaw=/187x12:1126x638/750x500/data/photo/2020/06/12/5ee2bae6901d6.jpg')
                expect(res.body).toHaveProperty("price", 50000)
                expect(res.body).toHaveProperty("stock", 12)
                expect(res.body).toHaveProperty("category", 'games')
                done()
            })
          })
        })
      })


      describe("error create product function", () => {
        test("error empty create product test", (done) => {
          request(app)
          .post('/products')
          .set('access_token', `${access_token}`)
          .send({
            name: '',
            image_url: '',
            price: '',
            stock: '',
            category: '',
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then(res => {
            expect(res.status).toBe(500)
            expect(res.body).toStrictEqual({"message": "WHERE parameter \"email\" has invalid \"undefined\" value",})
            done()
          })
        })
      })

        test("error empty contain in price, stock, category in create product test", (done) => {
          request(app)
          .post('/products')
          .set('access_token', `${access_token}`)
          .send({
            name : 'PlayStation 5',
            image_url : 'https://akcdn.detik.net.id/visual/2020/11/22/ilustrasi-ps5-1_169.png?w=650',
            price : '',
            stock : '',
            category: ''
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            
            expect(res.status).toBe(500)
            expect(res.body).toStrictEqual({"message": "WHERE parameter \"email\" has invalid \"undefined\" value",})
            done()
          })
        })
    
        test("error empty contain in stock create product test 2", (done) => {
          request(app)
          .post('/products')
          .set('access_token', `${access_token}`)
          .send({
            name : 'PS 5',
            image_url : 'https://akcdn.detik.net.id/visual/2020/11/22/ilustrasi-ps5-1_169.png?w=650',
            price : 8000000,
            stock : '',
            category: 'games'
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(500)
            expect(res.body).toStrictEqual({"message": "WHERE parameter \"email\" has invalid \"undefined\" value",})
            done()
          })
        })


  
    describe("test for read lists", () => {
      describe("test for read lists in products", ()=> {
        test("success read products test", (done) => {
          request(app)
          .get('/products')
          .set('access_token', `${access_token}`)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("id" , res.body.id)
            expect(res.body).toHaveProperty("name" , res.body.name)
            expect(res.body).toHaveProperty("image_url" , res.body.image_url)
            expect(res.body).toHaveProperty("price", res.body.price)
            expect(res.body).toHaveProperty("stock", res.body.stock)
            expect(res.body).toHaveProperty("category", res.body.category)
            done()
          })
        })
      })
    })
    
    describe("test for get list by id", () => {
      describe("test for get list by id in products", ()=> {
        test("success get list product test", (done) => {
          request(app)
          .get(`/products/${idProduct}`)
          .set('access_token', `${access_token}`)
          .end((err, res) => {
            if (err) {
              console.log(">>>>>", err, res, "<<<<")
              return done(err)
            }
            
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("name" , res.body.name)
            expect(res.body).toHaveProperty("image_url" , res.body.image_url)
            expect(res.body).toHaveProperty("price", res.body.price)
            expect(res.body).toHaveProperty("stock", res.body.stock)
            expect(res.body).toHaveProperty("category", res.body.category)
            done()
          })
        })
      })
    })

    describe("error test for get list by id in products without access token", ()=> {
        test("get list by id in product test without access_token", (done) => {
          request(app)
          .get(`/products/${idProduct}`)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            
            expect(res.status).toBe(500)
            expect(res.body).toHaveProperty("message", 'You must login first')
            done()
          })
        })
      })

      describe("error test for get list by id in products with riddiculous id", ()=> {
        test("get list by riddiculous id in product test", (done) => {
          request(app)
          .get(`/products/999`)
          .set('access_token', `${access_token}`)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            // console.log(res.body);
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("category", res.body.category)
            expect(res.body).toHaveProperty("name", res.body.name)
            expect(res.body).toHaveProperty("id", res.body.id)
            expect(res.body).toHaveProperty("price", res.body.price)
            expect(res.body).toHaveProperty("stock", res.body.stock)
            expect(res.body).toHaveProperty("image_url", res.body.image_url)
            expect(res.body).toHaveProperty("createdAt", res.body.createdAt)
            expect(res.body).toHaveProperty("updatedAt", res.body.updatedAt)
            done()
          })
        })
      })
    
    
    describe("test for update list by id", () => {
      describe("test for update list by id in products", ()=> {
        test("success update list product test", (done) => {
          request(app)
          .put(`/products/${idProduct}`)
          .set('access_token', `${access_token}`)
          .send({
            name : 'XBox',
            image_url : 'https://images-na.ssl-images-amazon.com/images/I/41euOnOSeYL._SX342_.jpg',
            price : 100000,
            stock : 20,
            category: 'games',
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("id", res.body.id)
            expect(res.body).toHaveProperty("name" , res.body.name)
            expect(res.body).toHaveProperty("category" , res.body.category)
            expect(res.body).toHaveProperty("price", res.body.price)
            done()
          })
        })
      })
    })
      describe("error test for update list by id in products without access_token", ()=> {
        test("update list product without access_token ", (done) => {
          request(app)
          .put(`/products/${idProduct}`)
          .send({
            name : 'XBox',
            image_url : 'https://images-na.ssl-images-amazon.com/images/I/41euOnOSeYL._SX342_.jpg',
            price : 100000,
            stock : 20,
            category: 'games',
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            
            expect(res.status).toBe(500)
            expect(res.body).toHaveProperty("message", `You must login first`)
            done()
          })
        })
      })
      describe("error test for update list by id in products with empty list", ()=> {
        test("update list empty contain in product test ", (done) => {
          request(app)
          .put(`/products/${idProduct}`)
          .set('access_token', `${access_token}`)
          .send({
            name : '',
            image_url : '',
            price : '',
            stock : '',
            category: '',
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            
            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({"errors": ["name is required", "image_url is required", "price is required", "stock is required", "category is required"], "message": "Bad request"})
            done()
          })
        })
    })
    
        // describe("error test for update list by id in products with half empty list", ()=> {
        //   test("update list empty contain in product at price, stock test", (done) => {
        //     request(app)
        //     .put(`/products/${idProduct}`)
        //     .set('access_token', `${access_token}`)
        //     .send({
        //         name : 'XBox',
        //         image_url : 'https://images-na.ssl-images-amazon.com/images/I/41euOnOSeYL._SX342_.jpg',
        //         price : '',
        //         stock : '',
        //         category: 'games',
        //     })
        //     .end((err, res) => {
        //       if (err) {
        //         return done(err)
        //       }
        //       expect(res.status).toBe(400)
        //       expect(res.body).toStrictEqual({"errors": ["price is required", "stock is required"], "message": "Bad request"})
        //       done()
        //     })
        //   })
        // })
    
    // describe("test for delete list by id", () => {
    //   describe("test for delete list by id in products", ()=> {
    //     test("success delete list product test", (done) => {
    //       request(app)
    //       .delete(`/products/${idProduct}`)
    //       .set('access_token', `${access_token}`)
    //       .end((err, res) => {
    //         if (err) {
    //           return done(err)
    //         }
            
    //         expect(res.status).toBe(200)
    //         expect(res.body).toHaveProperty("message", `Product successfully deleted`)
    //         done()
    //       })
    //     })
    //   })
    // })

    //   describe("error test for delete list by id in products", ()=> {
    //     test("error delete list with riddiculous id product test", (done) => {
    //       request(app)
    //       .delete(`/products/999`)
    //       .set('access_token', `${access_token}`)
    //       .end((err, res) => {
    //         if (err) {
    //           return done(err)
    //         }
            
    //         expect(res.status).toBe(404)
    //         expect(res.body).toHaveProperty("message", `error not found`)
    //         done()
    //       })
    //     })
    //   })
  
})