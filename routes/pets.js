const express = require('express');
const Joi = require('@hapi/joi');
const Pets = require('../models/pets');
const router = express.Router();
const { validateBody } = require('../middlewares/route');

//@route GET api/pets
//@desc get the pets details
//@access Public

router.get('/', async (req, res) => {
  try {
    const pets = await Pets.find().populate('pets', ['name']);
    res.json(pets);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  CREATE /pets
//@desc   CREATE pets profile
//@access Privet
router.post(
  '/',
  validateBody(
    Joi.object().keys({
      name: Joi.string()
        .required()
        .description('Pets name'),
      age: Joi.number()
        .integer()
        .description('Pets age'),
      color: Joi.string()
        .required()
        .description('Pets color')
    })
  ),
  async (req, res) => {
    const { name, age, color } = req.body;
    const petsFileds = {
      name,
      age,
      color
    };
    try {
      let pets = await Pets.findOne({ name: req.body.name });
      console.log('before ', pets);
      if (pets) {
        pets = await Pets.findOneAndUpdate(
          { name: 'dog' },
          { $set: petsFileds }
        );
        console.log('inside', pets);
        const pet = await pets.save();
        console.log('inside after update', pet);
        return res.json(pet);
      }
      pets = new Pets(petsFileds);
      console.log('outisde', pets);
      await pets.save();
      return res.json(pets);
    } catch (err) {
      return res.status(500).send(`Server error :${err.message}`);
    }
  }
);

//@route  DELETE /pets/:id
//@desc   delete pets
//@access Privet

router.delete('/:id', async (req, res) => {
  try {
    //remove profile
    const pets = await Pets.findOneAndDelete({ user: req.id });
    res.json({ msg: 'Pets profile Deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
