const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');

const { expect } = chai;

chai.use(chaiHttp);

let idPet = 0;
const url = '/pets';

describe('Positive Test cases for save, get and delete Pet Details', () => {
  /*
   * Test the /POST route
   */
  it('it should Save Pet Details', done => {
    chai
      .request(server)
      .post(`${url}`)
      .send({
        name: 'dog',
        age: 4,
        colours: 'black'
      })
      .end((err, res) => {
        idPet = res.body.insertId;
        expect(res.status).to.equal(201);
        expect(res.body).to.not.equal(0);
        done();
      });
  });

  /*
   * Test the /GET route
   */
  it('it should get the pet details', done => {
    chai
      .request(server)
      .get(`${url}/${idPet}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.not.equal(0);
        done();
      });
  });

  /*
   * Test the /DELETE route
   */
  it('it should delete the pet details', done => {
    chai
      .request(server)
      .delete(`${url}/${idPet}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Negative Test cases for save, get and delete Pet Details', () => {
  /*
   * Test the /POST route
   */
  it('it should not Save Pet Details if name is not string', done => {
    chai
      .request(server)
      .post(`${url}`)
      .send({
        name: 3,
        age: 4,
        colours: 'black'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  /*
   * Test the /POST route
   */
  it('it should not Save Pet Details if age is not number', done => {
    chai
      .request(server)
      .post(`${url}`)
      .send({
        name: 'dog',
        age: 'four',
        colours: 'black'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  /*
   * Test the /POST route
   */
  it('it should not Save Pet Details if colour is not string', done => {
    chai
      .request(server)
      .post(`${url}`)
      .send({
        name: 'dog',
        age: 4,
        colours: 5
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  /*
   * Test the /GET route
   */
  it('it should not get the pet details if the idPet value is undefined', done => {
    chai
      .request(server)
      .get(`${url}/undefined`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  /*
   * Test the /GET route
   */
  it('it should not get the pet details if the idPet value is null', done => {
    chai
      .request(server)
      .get(`${url}/null`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  /*
   * Test the /DELETE route
   */
  it('it should not delete the pet details if the idPet value is undefined', done => {
    chai
      .request(server)
      .delete(`${url}/undefined`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  /*
   * Test the /DELETE route
   */
  it('it should not delete the pet details if the idPet value is null', done => {
    chai
      .request(server)
      .delete(`${url}/null`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});