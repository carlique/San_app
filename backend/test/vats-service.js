//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let models = require('../lib/models');
let VAT = models.VAT;

chai.use(chaiHttp);

describe('/vats Resource', () => {
  beforeEach(function(done) {
    VAT.sync({ force : true }) // drops table and re-creates it
      .then(function() {
        done(null);
      })
      .error(function(error) {
        done(error);
      });
    });

  /*
  * Test the /GET route
  */
  describe('/GET VATs', () => {
    it('it should GET all VATs', (done) => {
      chai.request(server)
          .get('/vats')
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
  describe('/POST VAT', () => {
    it('it should not POST a VAT with empty name', (done) => {
      let vat = {
        name: "",
        vat: 21,
      }
      chai.request(server)
        .post('/vats')
        .send(vat)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
    });

    it('it should not POST a VAT with empty vat', (done) => {
      let vat = {
        name: "Base rate",
        vat: null,
      }
      chai.request(server)
        .post('/vats')
        .send(vat)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
    });

    it('it should POST a VAT ', (done) => {
      let vat = {
        name: "Base rate",
        vat: 21
      }
      chai.request(server)
        .post('/vats')
        .send(vat)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.have.header('Location','/vats/1');
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('Base rate');
            res.body.should.have.property('data').with.deep.property('vat').eql(21);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id VAT', () => {
    it('it should GET a VAT by the given id', (done) => {
      VAT.build({ name: "Base rate", vat: 21 })
      .save()
      .then((vat) => {
        chai.request(server)
        .get('/vats/' + vat.id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('Base rate');
            res.body.should.have.property('data').with.deep.property('vat').eql(21);
            res.body.should.have.property('message').eql('Returned VAT with id: ' + vat.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id VAT', () => {
    it('it should UPDATE a VAT given the id', (done) => {
      VAT.build({ name: "Base rate", vat: 21 })
      .save()
      .then((vat) => {
        chai.request(server)
        .put('/vats/' + vat.id)
        .send({ name: "Base rate", vat: 22 })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('Base rate');
            res.body.should.have.property('data').with.deep.property('vat').eql(22);
            res.body.should.have.property('message').eql('VAT updated with id: ' + vat.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id VAT', () => {
      it('it should DELETE a VAT given the id', (done) => {
        VAT.build({ name: "Base rate", vat: 21 })
        .save()
        .then((vat) => {
                chai.request(server)
                .delete('/vats/' + vat.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('VAT deleted with id: ' + vat.id);
                  done();
                });
          });
      });
  });
});
