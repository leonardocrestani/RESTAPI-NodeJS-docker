const Joi = require('joi');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.number().optional(),
      full_name: Joi.string().trim().min(3).optional()
    }).xor('id', 'full_name');
    const { error } = await schema.validate(req.query, { abortEarly: true });
    if (error) throw error
    return next();
  } 
  catch(erro) {
    return res.status(400).json({
      message: erro.message
  })}
}