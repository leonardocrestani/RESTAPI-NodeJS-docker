const Joi = require('joi');
const state = require('../../enums/stateEnum');
const pattern = /^(?!\s*$).+/

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.number(),
      name: Joi.string().pattern(pattern).min(3).required(),
      state: Joi.string().valid(...state).required()
    });
    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error
    return next();
  } 
  catch(erro) {
    return res.status(400).json({
      message: erro.message
  })}
}