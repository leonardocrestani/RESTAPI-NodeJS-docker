const Joi = require('joi');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      nome_completo: Joi.string().required(),
      sexo: Joi.string().required(),
      data_nascimento: Joi.date().required(),
      cidade: Joi.string().required()
    });
    const {error} = await schema.validate(req.body, { abortEarly: false });
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