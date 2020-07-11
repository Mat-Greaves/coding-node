const DA = require('./DA');

const isNumber = num => /^\d+$/.test(num);

/*
* Method Get is used to get the details of all the Pets.
*/
exports.getPets = async (req, res) => {
    try {
        const { idPet } = req.params;

        // Return error if idPet is not number.
        if (!isNumber(idPet)) return res.status(400).json('Pet Id is not a number');

        // Get the details of the pet by idPet.
        const result = await DA.getPets(idPet);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.json(err);
    }
}

/*
* Method Post to save the details of the Pet
*/
exports.savePet = async (req, res) => {
    try {
        const data = req.body;

        data.createdBy = 'Poornima G S';
        data.createdDate = new Date();

        // Save the pet details
        const result = await DA.savePet(data);

        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.json(err);
    }
}

/*
* Method Delete to delete the Pet by idPet
*/
exports.deletePet = async (req, res) => {
    try {
        const { idPet } = req.params;

        // Return error if idPet is not a number.
        if (!isNumber(idPet)) return res.status(400).json('Pet Id is not a number');

        // Delete the pet details by idPet.
        const result = await DA.deletePet(idPet);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.json(err);
    }
}