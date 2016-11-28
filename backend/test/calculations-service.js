// TODO: Test get on all fields

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let models = require('../lib/models');
let Calc = models.Calculation;
let Company = models.Company;
let Contact = models.Contact;
let Version = models.Version;

chai.use(chaiHttp);

describe('calculations Service', () => {
  beforeEach(function(done) {
    Calc.sync({ force : true }) // drops table and re-creates it
      .then(function() {
        done(null);
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
  describe('/GET calculations', () => {
    it('it should GET all calculations', (done) => {
      chai.request(server)
          .get('/calculations')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').a('array');
              res.body.should.have.property('data').a('array').with.lengthOf(0);
              res.body.should.have.property('message').eql('Returned 0 records.');
            done();
          });
    });
    it('it should GET only {limit} number of calculations', (done) => {
      var JSON = [
        { name: "some Calc 1", number: "16/0001" },
        { name: "some Calc 2", number: "16/0002" },
        { name: "some Calc 3", number: "16/0003" }
      ];
      Calc.bulkCreate(JSON)
      .then(function() {
        chai.request(server)
            .get('/calculations?limit=2')
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
    it('it should GET only calculations with id > {lastId}', (done) => {
      var JSON = [
        { name: "some Calc 1", number: "16/0001" },
        { name: "some Calc 2", number: "16/0002" },
        { name: "some Calc 3", number: "16/0003" }
      ];
      Calc.bulkCreate(JSON)
      .then(function() {
        chai.request(server)
            .get('/calculations?lastId=2&limit=1')
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
  describe('/POST calculation', () => {
    it('it should not POST a calculation with an empty name', (done) => {
      let calculation = {
        name: "",
        number: "16/0001",
      }
      chai.request(server)
        .post('/calculations')
        .send(calculation)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
    });

    it('it should not POST a calculation with an empty number', (done) => {
      let calculation = {
        name: "some Calc",
        number: "",
      }
      chai.request(server)
        .post('/calculations')
        .send(calculation)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
    });

    it('it should POST a calculation', (done) => {
      let calculation = {
        name: "Some Calc 1",
        number: "16/0001",
      }
      chai.request(server)
        .post('/calculations')
        .send(calculation)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.have.header('Location','/calculations/1');
          res.body.should.be.a('object');
          res.body.should.have.property('data').with.deep.property('name').eql('Some Calc 1');
          res.body.should.have.property('data').with.deep.property('id').eql(1);
          done();
        });
    });

    it('it should create a default version for POSTed calculation', (done) => {
      let calculation = {
        name: "Some Calc 1",
        number: "16/0001",
      }
      chai.request(server)
        .post('/calculations')
        .send(calculation)
        .end(function() {
          chai.request(server)
            .get('/calculations/1/versions/1')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').with.deep.property('number').eql(1);
              res.body.should.have.property('data').with.deep.property('id').eql(1);
              done();
            });
        });
    });

    it('it should POST a calculation referencing to an existing Company id', (done) => {
      Company.build({ name: "test", idNumber: "1234567" })
      .save()
      .then((company) => {
        let calculation = {
          name: "some Calc 1",
          number: "16/0001",
          companyId: company.id,
        }
        chai.request(server)
          .post('/calculations')
          .send(calculation)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.have.header('Location','/calculations/1');
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql("some Calc 1");
            res.body.should.have.property('data').with.deep.property('number').eql("16/0001");
            res.body.should.have.property('data').with.deep.property('CompanyId').eql(company.id);
            done();
          });
      });
    });

    it('it should not POST a calculation referencing to a non-existing Company id', (done) => {
      let calculation = {
        name: "Some Calc 1",
        number: "16/0001",
        companyId: 99999,
      }
      chai.request(server)
        .post('/calculations')
        .send(calculation)
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('fail');
          done();
        });
    });

    it('it should POST a calculation referencing to an existing Contact id', (done) => {
      Contact.build({ firstName: "John", lastName: "Doe" })
      .save()
      .then((contact) => {
        let calculation = {
          name: "some Calc 1",
          number: "16/0001",
          contactId: contact.id,
        }
        chai.request(server)
          .post('/calculations')
          .send(calculation)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.have.header('Location','/calculations/1');
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql("some Calc 1");
            res.body.should.have.property('data').with.deep.property('number').eql("16/0001");
            res.body.should.have.property('data').with.deep.property('ContactId').eql(contact.id);
            done();
          });
      });
    });

    it('it should not POST a calculation referencing to a non-existing Contact id', (done) => {
      let calculation = {
        name: "Some Calc 1",
        number: "16/0001",
        contactId: 99999,
      }
      chai.request(server)
        .post('/calculations')
        .send(calculation)
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('fail');
          done();
        });
    });

  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id calculation', () => {
    it('it should GET a calculation by the given id', (done) => {
      Calc.build({ name: "some Calc", number: "16/0001" })
      .save()
      .then((calculation) => {
        chai.request(server)
        .get('/calculations/' + calculation.id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('name').eql('some Calc');
            res.body.should.have.property('data').with.deep.property('number').eql('16/0001');
            res.body.should.have.property('message').eql('Returned calculation with id: ' + calculation.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id calculation', () => {
    it('it should UPDATE a calculation given the id', (done) => {
      Calc.build({ name: "some Calc", number: "16/0001" })
      .save()
      .then((calculation) => {
        chai.request(server)
        .put('/calculations/' + calculation.id)
        .send({ name: "some Calc", number: "16/0002" })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('number').eql('16/0002');
            res.body.should.have.property('message').eql('Calculation updated with id: ' + calculation.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id calculation', () => {
      it('it should DELETE a calculation given the id', (done) => {
        Calc.build({ name: "some Calc", number: "16/0001" })
        .save()
        .then((calculation) => {
                chai.request(server)
                .delete('/calculations/' + calculation.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Calculation deleted with id: ' + calculation.id);
                  done();
                });
          });
      });
  });
});
