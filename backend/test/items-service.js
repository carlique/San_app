//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let models = require('../lib/models');
let Item = models.Item;
let Version = models.Version;
let Calc = models.Calculation;

chai.use(chaiHttp);


describe('/calculations/:calculationId/versions/:versionId/items Resource', () => {
  beforeEach(function(done) {
    Item.sync({ force : true }) // drops table and re-creates it
      .then(function() {
        Version.sync({ force : true }) // drops table and re-creates it
          .then(function() {
             Calc.sync({ force : true }) // drops table, re-creates it and create samle Calculation
                .then(function() {
                  Calc.build({ name: "some Calc", number: "16/0001" })
                  .save()
                  .then(function() {
                    done(null);
                  });
                })
            });
        })
      .error(function(error) {
        done(error);
      });
  });

  /*
  * Test the /GET route
  */
  describe('/GET items', () => {
    it('it should GET all items for specified calculation', (done) => {
      chai.request(server)
          .get('/calculations/1/versions/1/items')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').a('array');
              res.body.should.have.property('data').a('array').with.lengthOf(0);
              res.body.should.have.property('message').eql('Returned 0 records.');
            done();
          });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST item', () => {
    it('it should not POST an item with an empty name', (done) => {
      let item = {
        name: "",
        amount: "",
        price: "",
      }
      chai.request(server)
        .post('/calculations/1/versions/1/items')
        .send(item)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
    });

    it('it should POST a item ', (done) => {
      let item = {
        name: "Foo item",
        amount: 10,
        unit: "ks",
        price: 10.5,
        discount: 0.15,
        vat: 21.0,
      }
      chai.request(server)
        .post('/calculations/1/versions/1/items')
        .send(item)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.have.header('Location','/calculations/1/versions/1/items/1');
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('Foo item');
            res.body.should.have.property('data').with.deep.property('amount').eql(10);
            res.body.should.have.property('data').with.deep.property('unit').eql("ks");
            res.body.should.have.property('data').with.deep.property('price').eql(10.5);
            res.body.should.have.property('data').with.deep.property('discount').eql(0.15);
            res.body.should.have.property('data').with.deep.property('vat').eql(21.0);
            res.body.should.have.property('data').with.deep.property('id').eql(1);
          done();
        });
    });

    it('it should not POST an item referenced to a non-existing version', (done) => {
      let item = {
        name: "Foo item",
        amount: "",
        price: "",
      }
      chai.request(server)
        .post('/calculations/1/versions/999/items')
        .send(item)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Couldn't find calculation/version with id: 1/999");
          done();
        });
    });

    it('it should not POST an item referenced to a non-existing calculation', (done) => {
      let item = {
        name: "Foo item",
        amount: "",
        price: "",
      }
      chai.request(server)
        .post('/calculations/999/versions/1/items')
        .send(item)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Couldn't find calculation/version with id: 999/1");
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id item', () => {
    it('it should GET an item by the given id', (done) => {
      Item.create({ name: "Foo item", VersionId: 1 })
      .then((item) => {
        chai.request(server)
          .get('/calculations/1/versions/1/items/' + item.id)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').with.deep.property('name').eql("Foo item");
              res.body.should.have.property('message').eql('Returned item with id: ' + item.id);
            done();
          });
      });
    });

    it('it should not GET an item referenced to a non-existing calculation', (done) => {
      chai.request(server)
        .get('/calculations/999/versions/1/items/1')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Couldn't find calculation/version with id: 999/1");
          done();
        });
    });

    it('it should not GET an item referenced to a non-existing version', (done) => {
      chai.request(server)
        .get('/calculations/1/versions/999/items/1')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Couldn't find calculation/version with id: 1/999");
          done();
        });
    });

  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id item', () => {
    it('it should UPDATE a item given the id', (done) => {
      Item.build({ name: "Foo item", VersionId: 1 })
      .save()
      .then((item) => {
        chai.request(server)
          .put('/calculations/1/versions/1/items/' + item.id)
          .send({ name: "Foo item changed" })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').with.deep.property('name').eql("Foo item changed");
              res.body.should.have.property('message').eql('Item updated with id: ' + item.id);
            done();
          });
      });
    });

    it('it should not PUT an item referenced to a non-existing calculation', (done) => {
      Item.build({ name: "Foo item", VersionId: 1 })
      .save()
      .then((item) => {
        chai.request(server)
          .put('/calculations/999/versions/1/items/' + item.id)
          .send({ name: "Foo item changed" })
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql("Couldn't find calculation/version with id: 999/1");
            done();
          });
      });
    });

    it('it should not PUT an item referenced to a non-existing version', (done) => {
      Item.build({ name: "Foo item", VersionId: 1 })
      .save()
      .then((item) => {
        chai.request(server)
          .put('/calculations/1/versions/999/items/' + item.id)
          .send({ name: "Foo item changed" })
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql("Couldn't find calculation/version with id: 1/999");
            done();
          });
      });
    });

  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id item', () => {
    it('it should DELETE a item given the id', (done) => {
      Item.build({ name: "Foo item", VersionId: 1 })
      .save()
      .then((item) => {
        chai.request(server)
          .delete('/calculations/1/versions/1/items/' + item.id)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Item deleted with id: ' + item.id);
            done();
          });
      });
    });

    it('it should not DELETE an item referenced to a non-existing calculation', (done) => {
      Item.build({ name: "Foo item", VersionId: 1 })
      .save()
      .then((item) => {
        chai.request(server)
          .delete('/calculations/999/versions/1/items/' + item.id)
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql("Couldn't find calculation/version with id: 999/1");
            done();
          });
      });
    });

    it('it should not DELETE an item referenced to a non-existing version', (done) => {
      Item.build({ name: "Foo item", VersionId: 1 })
      .save()
      .then((item) => {
        chai.request(server)
          .delete('/calculations/1/versions/999/items/' + item.id)
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql("Couldn't find calculation/version with id: 1/999");
            done();
          });
      });
    });
  });

});
