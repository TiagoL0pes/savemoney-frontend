import { Parcela } from './parcela';

export class ItemCartao {
    idItemCartao: number;
    dataCompra: number;
    descricao: number;
    valor: number;
    numeroParcelas: number;
    parcelas: Parcela[];

    constructor() {
        this.parcelas = [];
    }
}