function calculateAge(ano, mes, dia) {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();
    let idade = anoAtual - ano;
    if(mes > mesAtual || dia > diaAtual) {
        idade = idade - 1
    }
    return idade;
}

module.exports = calculateAge;