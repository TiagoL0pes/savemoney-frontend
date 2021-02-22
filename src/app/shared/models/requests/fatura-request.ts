export class FaturaRequest {
    idCartao: string;
    mes: number;
    ano: number;

    constructor(idCartao?, mes?, ano?) {
        this.idCartao = idCartao;
        this.mes = mes;
        this.ano = ano;
    }
}