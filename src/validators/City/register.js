const Joi = require('joi');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      nome: Joi.string().required(),
      estado: Joi.string().required()
    });
    const {error} = await schema.validate(req.body, { abortEarl: true });
    if(error instanceof Error) {
      throw new Error('Dados insuficientes na requisicao');
    }
    next();
  } 
  catch(erro) {
    return res.status(400).json({
      message: erro.message
  })}
}