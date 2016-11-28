// TODO: Test get on all fields

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let models = require('../lib/models');
let Company = models.Company;
let Contact = models.Contact;

chai.use(chaiHttp);

describe('companies Service', () => {
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
    it('it should GET only {limit} number of companies', (done) => {
      var JSON = [
        { name: "test1", idNumber: "1234567" },
        { name: "test2", idNumber: "234567" },
        { name: "test3", idNumber: "34567" }
      ];
      Company.bulkCreate(JSON)
      .then(function() {
        chai.request(server)
            .get('/companies?limit=2')
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
    it('it should GET only companies with id > {lastId}', (done) => {
      var JSON = [
        { name: "test1", idNumber: "1234567" },
        { name: "test2", idNumber: "234567" },
        { name: "test3", idNumber: "34567" }
      ];
      Company.bulkCreate(JSON)
      .then(function() {
        chai.request(server)
            .get('/companies?lastId=2&limit=1')
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
  describe('/POST company', () => {
    it('it should not POST a company with empty name', (done) => {
      let company = {
        name: "",
        idNumber: "1234567",
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
          idNumber: "1234567",
        }
        chai.request(server)
          .post('/companies')
          .send(company)
          .end((err, res) => {
              res.should.have.status(201);
              res.should.have.header('Location','/companies/1');
              res.body.should.be.a('object');
              res.body.should.have.property('data').with.deep.property('name').eql('test');
              res.body.should.have.property('data').with.deep.property('id').eql(1);
            done();
          });
      });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id company', () => {
    it('it should GET a company by the given id', (done) => {
      Company.build({ name: "test", idNumber: "1234567" })
      .save()
      .then((company) => {
        chai.request(server)
        .get('/companies/' + company.id)
        .send(company)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('test');
            res.body.should.have.property('data').with.deep.property('idNumber').eql('1234567');
            res.body.should.have.property('message').eql('Returned company with id: ' + company.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /GET/:id/contacts route
   */
  describe('/GET/:id/contacts ', () => {
    it('it should GET all contacts for the company with the given id', (done) => {
      Company.build({ name: "test", idNumber: "1234567" })
      .save()
      .then((company) => {
        Contact.build({ firstName: "John", lastName: "Doe", CompanyId: company.id })
        .save()
        .then((contact) => {
          chai.request(server)
          .get('/companies/'+ company.id + '/contacts')
          .send(contact)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').a('array');
              res.body.should.have.property('message').eql('Returned 1 records.');
            done();
          });
        });
      });
    });
  });


  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id company', () => {
    it('it should UPDATE a company given the id', (done) => {
      Company.build({ name: "test2", idNumber: "1234567" })
      .save()
      .then((company) => {
        chai.request(server)
        .put('/companies/' + company.id)
        .send({ name: "test2", idNumber: "7654321", })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('idNumber').eql('7654321');
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
        Company.build({ name: "test2", idNumber: "1234567" })
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
