export class ItemCartaoRequest {
    dataCompra: string;
    descricao: string;
    valor: number;
    numeroParcelas: number;

    constructor(dataCompra?, descricao?, valor?, installmentsNumber?) {
        this.dataCompra = dataCompra;
        this.descricao = descricao;
        this.valor = valor;
        this.numeroParcelas = installmentsNumber;
    }
}
