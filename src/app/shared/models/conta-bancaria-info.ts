export class ContaBancariaInfo {
    idContaBancaria: number;
    agencia: string;
    conta: string;

    constructor(idContaBancaria?, agencia?, conta?) {
        this.idContaBancaria = idContaBancaria;
        this.agencia = agencia;
        this.conta = conta;
    }
}
