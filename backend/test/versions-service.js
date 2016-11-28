//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let models = require('../lib/models');
let Version = models.Version;
let Calculation = models.Calculation;

chai.use(chaiHttp);


describe('versions Service', () => {
  beforeEach(function(done) {
   Calculation.sync({ force : true }) // drops table and re-creates it
      .then(function() {
        var JSON = [
          { id: 1, name: "Calculation 1", number: "16/0001" },
          { id: 2, name: "Calculation 2", number: "16/0002" }
        ];
        Calculation.bulkCreate(JSON)
        .then(function() {
          done(null);
        });
      })
      .error(function(error) {
        done(error);
      });
  });

  beforeEach(function(done) {
    Version.sync({ force : true }) // drops table and re-creates it
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
  describe('/GET versions', () => {
    it('it should GET all versions for specified calculation', (done) => {
      chai.request(server)
          .get('/calculations/1/versions')
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
  describe('/POST version', () => {
    it('it should not POST a version with an empty number', (done) => {
      let version = {
        number: "",
        calculationId: 1
      }
      chai.request(server)
        .post('/calculations/1/versions')
        .send(version)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
    });
    it('it should POST a version ', (done) => {
      let version = {
        desc: "Some version of the calculation number 1"
      }
      chai.request(server)
        .post('/calculations/1/versions')
        .send(version)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.have.header('Location','/calculations/1/versions/1');
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('number').eql(1);
            res.body.should.have.property('data').with.deep.property('desc').eql('Some version of the calculation number 1');
            res.body.should.have.property('data').with.deep.property('id').eql(1);
          done();
        });
    });

    it('it should not POST a version referenced to a non-existing calculation', (done) => {
      let version = {
        number: 1,
        desc: "Some version of the calculation number 999"
      }
      chai.request(server)
        .post('/calculations/999/versions')
        .send(version)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Couldn't find calculation with id: 999");
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id version', () => {
    it('it should GET a version by the given id', (done) => {
      Version.create({ desc: "", CompanyId: "1" })
      .then((version) => {
        chai.request(server)
          .get('/calculations/1/versions/' + version.id)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').with.deep.property('number').eql(version.number);
              res.body.should.have.property('message').eql('Returned version with id: ' + version.id);
            done();
          });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id version', () => {
    it('it should UPDATE a version given the id', (done) => {
      Version.build({ desc: "", CompanyId: "1" })
      .save()
      .then((version) => {
        chai.request(server)
        .put('/calculations/1/versions/' + version.id)
        .send({ desc: "some desc" })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('desc').eql('some desc');
            res.body.should.have.property('message').eql('Version updated with id: ' + version.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id version', () => {
      it('it should DELETE a version given the id', (done) => {
        Version.build({ desc: "", CompanyId: "1" })
        .save()
        .then((version) => {
                chai.request(server)
                .delete('/calculations/1/versions/' + version.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Version deleted with id: ' + version.id);
                  done();
                });
          });
      });
  });
});
