const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.get(
    '/',
    (req, res, next) => {
      try {
        const pet = Pet.find();
        res.status(201).json(pet);
      } catch (e) {
        next(e);
      }
    }
  );

router.post(
    '/',
    validateBody(Joi.object().keys({
      name: Joi.string().required().description('Pets name'),
      age: Joi.number().integer().required().description('Pets age'),
      colour: Joi.string().required().description('Pets colour')
    }),
    {
      stripUnknown: true,
    }),
    async (req, res, next) => {
      try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).json(pet);
      } catch (e) {
        next(e);
      }
    }
  );

  router.delete(
    '/delete',
    (req, res, next) => {
      try {
        const pet = Pet.deleteMany({});
        res.status(201).json(pet);
      } catch (e) {
        next(e);
      }
    }
  );

module.exports = router;