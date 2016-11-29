// TODO: Test get on all fields

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let models = require('../lib/models');
let Resource = models.Resource;
let VAT = models.VAT;

chai.use(chaiHttp);

before(function(done) {
 VAT.sync({ force : true }) // drops table and re-creates it
    .then(function() {
      var JSON = [
        { id: 1, name: "base VAT", vat: 21 },
        { id: 2, name: "lowered VAT", vat: 15 }
      ];
      VAT.bulkCreate(JSON)
      .then(function() {
        done(null);
      });
    })
    .error(function(error) {
      done(error);
    });
});

describe('/resources Resource', () => {
  beforeEach(function(done) {
    Resource.sync({ force : true }) // drops table and re-creates it
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
  describe('/GET resources', () => {
    it('it should GET all resources', (done) => {
      chai.request(server)
          .get('/resources')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').a('array');
              res.body.should.have.property('data').a('array').with.lengthOf(0);
              res.body.should.have.property('message').eql('Returned 0 records.');
            done();
          });
    });
    it('it should GET only {limit} number of resources', (done) => {
      var JSON = [
        { name: "some stuff", altName: "superstuff", VATId: 1 },
        { name: "some stuff 2", altName: "superstuff", VATId: 1  },
        { name: "some stuff 3", altName: "superstuff", VATId: 1  }
      ];
      Resource.bulkCreate(JSON)
      .then(function() {
        chai.request(server)
            .get('/resources?limit=2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data').a('array');
                res.body.should.have.property('data').a('array').with.lengthOf(2);
                res.body.should.have.property('message').eql('Returned 2 records.');
              done();
        });
      });
    });
    it('it should GET only resources with id > {lastId}', (done) => {
      var JSON = [
        { name: "some stuff", altName: "superstuff", VATId: 1 },
        { name: "some stuff 2", altName: "superstuff", VATId: 1  },
        { name: "some stuff 3", altName: "superstuff", VATId: 1  }
      ];
      Resource.bulkCreate(JSON)
      .then(function() {
        chai.request(server)
            .get('/resources?lastId=2&limit=1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data').a('array');
                res.body.should.have.property('data').a('array').with.lengthOf(1);
                res.body.should.have.property('message').eql('Returned 1 records.');
              done();
            });
      });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST resource', () => {
    it('it should not POST a resource with empty name', (done) => {
      let resource = {
        name: "",
        altName: "superstuff",
      }
      chai.request(server)
        .post('/resources')
        .send(resource)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
    });

    it('it should not POST a resource referencing to a non-existing VAT id', (done) => {
      let resource = {
        name: "some stuff",
        altName: "superstuff",
        vatId: 11
      }
      chai.request(server)
        .post('/resources')
        .send(resource)
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('fail');
          done();
        });
    });

    it('it should POST a resource ', (done) => {
      let resource = {
        name: "some stuff",
        altName: "superstuff",
        vatId: 1
      }
      chai.request(server)
        .post('/resources')
        .send(resource)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.have.header('Location','/resources/1');
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('some stuff');
            res.body.should.have.property('data').with.deep.property('id').eql(1);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id resource', () => {
    it('it should GET a resource by the given id', (done) => {
      Resource.build({ name: "some stuff", altName: "superstuff" })
      .save()
      .then((resource) => {
        chai.request(server)
        .get('/resources/' + resource.id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('some stuff');
            res.body.should.have.property('data').with.deep.property('altName').eql('superstuff');
            res.body.should.have.property('message').eql('Returned resource with id: ' + resource.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id resource', () => {
    it('it should UPDATE a resource given the id', (done) => {
      Resource.build({ name: "some stuff", altName: "superstuff", VATId: 1 })
      .save()
      .then((resource) => {
        chai.request(server)
        .put('/resources/' + resource.id)
        .send({ name: "some altered stuff", altName: "superstuff", })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('some altered stuff');
            res.body.should.have.property('message').eql('Resource updated with id: ' + resource.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id resource', () => {
      it('it should DELETE a resource given the id', (done) => {
        Resource.build({ name: "some stuff", altName: "superstuff" })
        .save()
        .then((resource) => {
                chai.request(server)
                .delete('/resources/' + resource.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Resource deleted with id: ' + resource.id);
                  done();
                });
          });
      });
  });
});
