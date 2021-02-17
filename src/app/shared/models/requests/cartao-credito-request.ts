import { ContaBancaria } from '../conta-bancaria';

export class CartaoCreditoRequest {
    idCartaoCredito: number;
    numero: string;
    diaVencimento: number;
    limiteCredito: number;
    contaBancaria: ContaBancaria;

    constructor(numero, diaVencimento, limiteCredito, contaBancaria = new ContaBancaria()) {
        this.numero = numero;
        this.diaVencimento = diaVencimento;
        this.limiteCredito = limiteCredito;
        this.contaBancaria = contaBancaria;
    }
}
