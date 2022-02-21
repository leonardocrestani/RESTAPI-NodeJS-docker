class NotFound extends Error {
    constructor(tipo) {
        super(`Nao foi possivel encontrar a(o) ${tipo} informado`);
    }
}

module.exports = NotFound;