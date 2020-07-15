const express = require("express");
const Joi = require("@hapi/joi");

const Pet = require("../models/pets");
const { validateBody } = require("../middlewares/route");
const { route } = require("./users");

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const pets = await Pet.find();
            res.send(pets);
        } catch (e) {
            next(e);
        }
    })
    .post(
        validateBody(Joi.object()
            .keys({
                name: Joi.string().required().description('Pet name'),
                age: Joi.number().integer().required().description('Users age'),
                colour: Joi.string().required().description('Pet colour'),
            }),
            {
                stripUnknown: true,                
            }
        ),
        async (req, res, next) => {
            try {
                console.log(req.body);
                const pet = await new Pet(req.body).save();
                res.status(201).send(pet);

            } catch (e) {
                // console.log(e)
                next(e);
            }
        });

router.delete('/:id', async (req, res, next) => {
    try {
        const itemID = req.params.id
        const deletedPet = await Pet.deleteOne({ "_id": itemID })
        res.send(deletedPet);
    } catch (e) {
        next(e);
    }
});
module.exports = router;