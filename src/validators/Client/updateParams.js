const Joi = require('joi');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.number()
    });
    const { error } = await schema.validate(req.params, { abortEarly: true });
    if (error) throw error
    return next();
  } 
  catch(erro) { 
    return res.status(400).json(
      erro.details.map(detail => ({
          message: detail.message,
          path: detail.path
      }))
    )
  }
}