class InvalidParameters extends Error {
    constructor(mensagem) {
        super(mensagem);
    }
}

module.exports = InvalidParameters;