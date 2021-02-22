import { Parcela } from "./parcela";

export class Fatura {
    idFatura: number;
    parcelas: Parcela[];
    dataVencimento: string;
    statusPagamento: string;
    total: number;
}