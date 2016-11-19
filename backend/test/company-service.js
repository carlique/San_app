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
          .get('/company')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
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
        .post('/company')
        .send(company)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('array');
//              res.body.should.have.deep.property('path').containEql('name');
//              res.body.should.have.deep.property('message').containEql('notEmpty');
          done();
        });
      });
      it('it should POST a company ', (done) => {
        let company = {
          name: "test",
          ico: "1234567",
        }
        chai.request(server)
          .post('/company')
          .send(company)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('ico');
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
        .get('/company/' + company.id)
        .send(company)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('ico');
            res.body.should.have.property('id').eql(company.id);
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
        .put('/company/' + company.id)
        .send({ name: "test2", ico: "7654321", })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ico').eql('7654321');
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
        let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
        book.save((err, book) => {
                chai.request(server)
                .delete('/book/' + book.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });
});
