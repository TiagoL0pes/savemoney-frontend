import { ItemCartao } from './item-cartao';

export class ResumoItemCartao {
    idCartaoCredito: number;
    valor: number;
    totalItens: number;
    itens: ItemCartao[];

    constructor() {
        this.itens = [];
    }
}