const Joi = require('@hapi/joi');
const express = require('express');

const handler = require('./handler');
const { validateBody } = require('../../middlewares/route');

const router = express.Router();

// Get the ped details by pet id
router.get('/:idPet', handler.getPets);

// Save the pet details
router.post('/', validateBody(Joi.object().keys({
  name: Joi.string().max(100).required(),
  age: Joi.number().required(),
  colours: Joi.string().max(100).required()
}),
  {
    stripUnknown: true,
  }),
  handler.savePet);

// Delete the pet details by pet id
router.delete('/:idPet', handler.deletePet);

module.exports = router;