'use strict';
const auth = require('../middlewares/auth');
const express = require('express');
const Joi = require('@hapi/joi');
const Pets = require('../models/pets');
const router = express.Router();
const { validateBody } = require('../middlewares/route');

//@route GET /pets
//@desc get the pets details
//@access Public

router.get('/', async (req, res) => {
  try {
    const pets = await Pets.find().populate('pets', ['name']);
    res.json(pets);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

//@route GET /pets/:id
//@desc get the pet's profile by id
//@access Public

router.get('/:id', async (req, res) => {
  try {
    const pets = await Pets.findById({ _id: req.params.id }).populate('pets', [
      'name'
    ]);
    res.json(pets);
  } catch (err) {
    console.log(err.message);
    return res.status(404).send('No pets profile found with the given id');
  }
});

//@route  CREATE /pets
//@desc   CREATE pets profile
//@access Privet
router.post(
  '/',
  //[
  //auth,
  [
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
    )
  ],
  //]
  async (req, res) => {
    const { name, age, color } = req.body;
    const petsFileds = {
      name,
      age,
      color
    };
    console.log('petsfield', petsFileds);
    try {
      let pets = await Pets.findOneAndUpdate(
        { name: req.body.name },
        { $set: petsFileds }
      );
      if (pets === null) {
        pets = new Pets(petsFileds);
        let petsNew = await pets.save();
        return res.json(petsNew);
      }
      pets = await Pets.findOne({ name: req.body.name });
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
