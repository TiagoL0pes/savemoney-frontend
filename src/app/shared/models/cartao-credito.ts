import { ContaBancaria } from "./conta-bancaria";
import { ItemCartao } from "./item-cartao";

export class CartaoCredito {
    idCartaoCredito: number;
    numero: string;
    diaVencimento: number;
    limiteCredito: number;
    limiteUtilizado: number;
    contaBancaria: ContaBancaria;
    itens: ItemCartao[];

    constructor() {
        this.contaBancaria = new ContaBancaria();
        this.itens = [];
    }
}