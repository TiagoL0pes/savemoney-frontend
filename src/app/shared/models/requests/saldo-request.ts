export class SaldoRequest {
    valor: number;
    descricao: string;
    transacao: string;

    constructor(valor?, descricao?, transacao?) {
        this.valor = valor;
        this.descricao = descricao;
        this.transacao = transacao;
    }
}