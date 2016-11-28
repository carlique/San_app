//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let models = require('../lib/models');
let Contact = models.Contact;
let Company = models.Company;

chai.use(chaiHttp);

describe('contacts Service', () => {
  beforeEach(function(done) {
    Contact.sync({ force : true }) // drops table and re-creates it
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
  describe('/GET contacts', () => {
    it('it should GET all the contacts', (done) => {
      chai.request(server)
          .get('/contacts')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').a('array');
              res.body.should.have.property('data').a('array').with.lengthOf(0);
              res.body.should.have.property('message').eql('Returned 0 records.');
            done();
          });
    });
    it('it should GET only {limit} number of contacts', (done) => {
      var JSON = [
        { firstName: "John", lastName: "Doe" },
        { firstName: "Jane", lastName: "Smith" },
        { firstName: "Eve", lastName: "Dell" }
      ];
      Contact.bulkCreate(JSON)
      .then(function() {
        chai.request(server)
            .get('/contacts?limit=2')
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
    it('it should GET only contacts with id > {lastId}', (done) => {
      var JSON = [
        { firstName: "John", lastName: "Doe" },
        { firstName: "Jane", lastName: "Smith" },
        { firstName: "Eve", lastName: "Dell" }
      ];
      Contact.bulkCreate(JSON)
      .then(function() {
        chai.request(server)
            .get('/contacts?lastId=2&limit=1')
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
  describe('/POST contact', () => {
    it('it should not POST a contact with empty name', (done) => {
      let contact = {
        firstName: "John",
        lastName: "",
        phoneNumber: "1234567"
      }
      chai.request(server)
        .post('/contacts')
        .send(contact)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Validation error');
          done();
        });
    });
    it('it should POST a contact ', (done) => {
      let contact = {
        firstName: "John",
        lastName: "Doe",
        title: "Mr.",
        position: "CEO",
        street: "Some street 666",
        city: "Prague",
        post: "170 00",
        country: "Czech Republic",
        phoneNumber: "+777777776",
        phoneNumber2: "+777777777",
        email: "john@doe.com",
        www: "http://some.url.ltd",
        desc: "Some very long text description"
      }
      chai.request(server)
        .post('/contacts')
        .send(contact)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.have.header('Location','/contacts/1');
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('firstName').eql('John');
            res.body.should.have.property('data').with.deep.property('lastName').eql('Doe');
            res.body.should.have.property('data').with.deep.property('title').eql('Mr.');
            res.body.should.have.property('data').with.deep.property('position').eql('CEO');
            res.body.should.have.property('data').with.deep.property('street').eql('Some street 666');
            res.body.should.have.property('data').with.deep.property('city').eql('Prague');
            res.body.should.have.property('data').with.deep.property('post').eql('170 00');
            res.body.should.have.property('data').with.deep.property('country').eql('Czech Republic');
            res.body.should.have.property('data').with.deep.property('phoneNumber').eql('+777777776');
            res.body.should.have.property('data').with.deep.property('phoneNumber2').eql('+777777777');
            res.body.should.have.property('data').with.deep.property('email').eql('john@doe.com');
            res.body.should.have.property('data').with.deep.property('www').eql('http://some.url.ltd');
            res.body.should.have.property('data').with.deep.property('desc').eql('Some very long text description');
            res.body.should.have.property('data').with.deep.property('id').eql(1);
          done();
        });
    });
    it('it should POST a contact referenced to an existing company', (done) => {
      Company.build({ name: "test", idNumber: "1234567" })
      .save()
      .then((company) => {
        let contact = {
          firstName: "Jane",
          lastName: "Smith",
          companyId: company.id
        }
        chai.request(server)
          .post('/contacts')
          .send(contact)
          .end((err, res) => {
              res.should.have.status(201);
              res.should.have.header('Location','/contacts/1');
              res.body.should.be.a('object');
              res.body.should.have.property('data').with.deep.property('firstName').eql('Jane');
              res.body.should.have.property('data').with.deep.property('id').eql(1);
              res.body.should.have.property('data').with.deep.property('CompanyId').eql(company.id);
            done();
          });
      });
    });
    it('it should not POST a contact referencing to a non-existing company', (done) => {
      let contact = {
        firstName: "John",
        lastName: "Doe",
        companyId: 999
      }
      chai.request(server)
        .post('/contacts')
        .send(contact)
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
  describe('/GET/:id contact', () => {
    it('it should GET a contact by the given id', (done) => {
      Contact.build({ firstName: "John", lastName: "Doe" })
      .save()
      .then((contact) => {
        chai.request(server)
        .get('/contacts/' + contact.id)
        .send(contact)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('firstName').eql('John');
            res.body.should.have.property('data').with.deep.property('lastName').eql('Doe');
            res.body.should.have.property('message').eql('Returned contact with id: ' + contact.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id contact', () => {
    it('it should UPDATE a contact given the id', (done) => {
      Contact.build({ firstName: "Joe", lastName: "Doe" })
      .save()
      .then((contact) => {
        chai.request(server)
        .put('/contacts/' + contact.id)
        .send({ firstName: "John", lastName: "Doe", })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.deep.property('firstName').eql('John');
            res.body.should.have.property('message').eql('Contact updated with id: ' + contact.id);
          done();
        });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id contact', () => {
      it('it should DELETE a contact given the id', (done) => {
        Contact.build({ firstName: "Joe", lastName: "Doe" })
        .save()
        .then((contact) => {
                chai.request(server)
                .delete('/contacts/' + contact.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Contact deleted with id: ' + contact.id);
                  done();
                });
          });
      });
  });
});
