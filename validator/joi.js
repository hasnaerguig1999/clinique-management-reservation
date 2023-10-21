const Joi = require('joi');
const { join } = require('path');

const succursaleSchema = Joi.object({
    name: Joi.string().required(),
    // picture: Joi.,
    address: Joi.string().required(),
    phone: Joi.number().required(),
    succursale_start: Joi.date().required(),
    succursale_end: Joi.date().required()
})

const validator = (schema, data) =>{
    const {error} = schema.validate(data,{
        abortEarly: false
    })
    console.log(error);
    if(error){
        const errs = error.details.map((detail)=>detail.message)
        return errs;
    }
}

const chefSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  picture: Joi.string().required(),
  grade: Joi.string().required(),
  status: Joi.boolean().required(),
  role: Joi.string().required(),
});

const technicienIdSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  picture: Joi.string().required(),
  disponibility: Joi.boolean().required(),
  speciality: Joi.string().required(),
  role: Joi.string().required(),
});


const serviceSchema = Joi.object({
  nom: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().required()
});

const reclamationSchema = Joi.object({
  time: Joi.date().required(),
  objet: Joi.string().required(),
  content: Joi.string().required()
});





module.exports = {succursaleSchema, validator, chefSchema, serviceSchema,technicienIdSchema,reclamationSchema }

