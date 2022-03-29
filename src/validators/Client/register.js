const Joi = require('joi');
const gender = require('../../enums/genderEnum');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.number(),
      full_name: Joi.string().trim().min(3).required(),
      gender: Joi.string().valid(...gender).required(),
      birth_date: Joi.date().required(),
      city: Joi.string().trim().min(3).required()
    });
    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error
    return next();
  } 
  catch(erro) { 
    return res.status(400).json(
      erro.details.map(detail => {
        return {
          message: detail.message,
          path: detail.path
        } 
      })
  )}
}