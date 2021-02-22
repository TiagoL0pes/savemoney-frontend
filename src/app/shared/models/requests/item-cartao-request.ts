export class ItemCartaoRequest {
    dataCompra: string;
    descricao: string;
    valorTotal: number;
    numeroParcelas: number;

    constructor(dataCompra?, descricao?, valorTotal?, installmentsNumber?) {
        this.dataCompra = dataCompra;
        this.descricao = descricao;
        this.valorTotal = valorTotal;
        this.numeroParcelas = installmentsNumber;
    }
}
