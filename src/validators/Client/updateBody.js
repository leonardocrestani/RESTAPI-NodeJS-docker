const Joi = require('joi');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      full_name: Joi.string().trim().min(3).required()
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