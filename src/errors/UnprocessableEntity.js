class UnprocessableEntity extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.nome = 'UnprocessableEntity';
    this.status = 422;
  }
}

module.exports = UnprocessableEntity;
