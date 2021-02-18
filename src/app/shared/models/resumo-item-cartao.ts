import { ItemCartao } from './item-cartao';

export class ResumoItemCartao {
    idCartaoCredito: number;
    valorTotal: number;
    totalItens: number;
    itens: ItemCartao[];

    constructor() {
        this.itens = [];
    }
}