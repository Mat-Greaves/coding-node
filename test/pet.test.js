const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Testing Pet - Negative', ()=>{
    it('should fail if pet create is failed', async () => {
        const req = {
            body: {
                age: '20',
                colour: 'cyan'
            }
        }
        const res = await request(app).post('/pets').send(req);
        expect(res.status).to.equal(400);
    });
    it('should fail if pet delete is failed', async () => {
    
        const res = await request(app).delete('/pets/delete');
        expect(res.status).to.equal(400);
    });
    it('should fail if pet get is failed', async () => {
       
        const res = await request(app).get('/pets');
        expect(res.status).to.equal(400);
    })
    
})





