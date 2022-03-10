class NotFound extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.nome = 'NotFound'
        this.status = 404
    }
}

module.exports = NotFound;