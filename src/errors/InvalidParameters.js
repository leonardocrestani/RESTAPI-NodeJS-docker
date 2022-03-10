class InvalidParameters extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.nome = 'InvalidParameters'
        this.status = 422
    }
}

module.exports = InvalidParameters;