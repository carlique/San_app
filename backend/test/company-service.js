//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let companyService = require('../lib/services/company');
let models = require('../lib/models');
let Company = models.Company;

chai.use(chaiHttp);

describe('companyService', () => {
  beforeEach(function(done) {
    Company.sync({ force : true }) // drops table and re-creates it
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
  describe('/GET company', () => {
    it('it should GET all the companies', (done) => {
      chai.request(server)
          .get('/companies')
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
  describe('/POST book', () => {
    it('it should not POST a company with empty name', (done) => {
      let company = {
        name: "",
        ico: "1234567",
      }
      chai.request(server)
        .post('/companies')
        .send(company)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
      });
      it('it should POST a company ', (done) => {
        let company = {
          name: "test",
          ico: "1234567",
        }
        chai.request(server)
          .post('/companies')
          .send(company)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').with.deep.property('name').eql('test');
              res.body.should.have.property('data').with.deep.property('ico').eql('1234567');
            done();
          });
      });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id company', () => {
    it('it should GET a company by the given id', (done) => {
      Company.build({ name: "test", ico: "1234567" })
      .save()
      .then((company) => {
        chai.request(server)
        .get('/companies/' + company.id)
        .send(company)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('test');
            res.body.should.have.property('data').with.deep.property('ico').eql('1234567');
            res.body.should.have.property('message').eql('Returned company with id: ' + company.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id company', () => {
    it('it should UPDATE a company given the id', (done) => {
      Company.build({ name: "test2", ico: "1234567" })
      .save()
      .then((company) => {
        chai.request(server)
        .put('/companies/' + company.id)
        .send({ name: "test2", ico: "7654321", })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('ico').eql('7654321');
            res.body.should.have.property('message').eql('Company updated with id: ' + company.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id company', () => {
      it('it should DELETE a company given the id', (done) => {
        Company.build({ name: "test2", ico: "1234567" })
        .save()
        .then((company) => {
                chai.request(server)
                .delete('/companies/' + company.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Company deleted with id: ' + company.id);
                  done();
                });
          });
      });
  });
});