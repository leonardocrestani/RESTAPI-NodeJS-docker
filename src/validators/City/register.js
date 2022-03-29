const Joi = require('joi');
const state = require('../../enums/stateEnum');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.number(),
      name: Joi.string().trim().min(2).required(),
      state: Joi.string().valid(...state).required()
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