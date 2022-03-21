const Joi = require('joi');
const pattern = /^(?!\s*$).+/

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.number(),
      name: Joi.string().pattern(pattern).min(3).required(),
      state: Joi.string().pattern(pattern).max(2).min(2).required()
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