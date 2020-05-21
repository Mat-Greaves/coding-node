const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - user', () => {
  it('should fail to create a pet without a name', async () => {
    const res = await request(app)
      .post('/pets')
      .send({
        age: '16',
        color: 'white'
      });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"Name" is required');
  });

  it('should create a pet profile', async () => {
    const pet = {
      name: 'Cat',
      age: 6,
      color: 'white'
    };
    const res = await request(app)
      .post('/pets')
      .send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.color).to.equal(pet.color);
  });
});
