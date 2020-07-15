const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe("functional - pet", () => {

    // Create pet - negative
    try{
        it("should fail to create a pet without colour", async () => {
            const res = await request(app).post("/pets").send({
                name: "Blacky",
                age: 5,
                color: "black"
            });
            expect(res.status).to.equal(400);
            
            expect(res.body.message).to.equal('"colour" is required');
    
        });
    }catch(e){
        console.log("error",e);
    }

    // Create pet - positive
    let createdPetId = null;
    it('should create a Pet', async () => {
        const pet = {
            name: 'Whitey',
            age: 6,
            colour: 'white',
        };
        const res = await request(app).post("/pets").send(pet);
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(pet.name);
        expect(res.body.age).to.equal(pet.age);
        expect(res.body.colour).to.equal(pet.colour);
        createdPetId = res.body._id;
    });

    // Get pets positive
    it('it should GET all the pets', async () => {
        const res = await request(app).get('/pets');
        expect(res.status).to.equal(200);
        expect(res.body).to.not.equal(null);
    });

    // Delete pet - positive
    it('it should DELETE a pet given the id', async () => {
        const res = await request(app).delete("/pets/" + createdPetId);
        expect(res.status).to.equal(200);
        expect(res.body.ok).to.equal(1);
        expect(res.body.n).to.equal(1);
        expect(res.body.deletedCount).to.equal(1);
    });

    // Delete pet - negative
    it('it should fail to DELETE a pet given the id', async () => {
        const res = await request(app).delete("/pets/" + 123456);
        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal('Cast to ObjectId failed for value "123456" at path "_id" for model "pet"');
    });
});