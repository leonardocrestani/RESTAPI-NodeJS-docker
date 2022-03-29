const Joi = require('joi');
const state = require('../../enums/stateEnum');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      name: Joi.string().trim().min(2).optional(),
      state: Joi.string().trim().valid(...state).optional()
    }).xor('name', 'state');
    const { error } = await schema.validate(req.query, { abortEarly: true });
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