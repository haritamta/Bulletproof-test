process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
// mockgoose will use memory store which does not have persistence

let Product = require('../models/Product');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

before(function (done) {
    mockgoose.prepareStorage().then(function () {
        console.log("testing")
        mongoose.connect('localhost:27017', function (err) {
            done(err);
        });
    });
});

describe('Products', () => {
    beforeEach((done) => { //Before each test we empty the database
        Product.remove({}, (err) => {
            done();
        });
    });

    describe('/GET product', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/product')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.least(0);
                    done();
                });
        });
    });

    describe('/POST, PUT and GET product', () => {
        it('it should POST, PUT and GET a product ', (done) => {
            let product = {
                productId: 1236,
                description: "High Heels",
                unitPrice: 25.50,
                stores: {
                    storeId: "store 1",
                    storeName: "Dummy store",
                    latitude: "34.65765",
                    longitude: "67.73576",
                    currentStock: 60,
                    reorderLavel: 40
                }
            }
            chai.request(server)
                .post('/product')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    //   console.log(JSON.stringify(res.body));
                      res.body.unitPrice.should.be.eql(25.50);
                      let id = res.body._id;
                    //   console.log(id);
                      let productUpdate ={ 
                        productId: 1236,
                        unitPrice: 30.00
                      }
                      chai.request(server)
                      .put('/product/' + id)
                      .send(productUpdate)
                      .end((err, res) => {
                        // console.log(JSON.stringify(res.body));
                        res.should.have.status(200);        
                        chai.request(server)
                        .get('/product/' + id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.unitPrice.should.be.eql(30.00);
                            done();
                        });
                        
                      });
                   
                });
        });
    });

});