import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatusPagamento } from '../enums/status-pagamento.enum';
import { Filter } from '../filters/filter';
import { Despesa } from '../models/despesa';
import { DespesaService } from '../services/despesa.service';

export class DespesaDatasource implements DataSource<Despesa> {
    private despesaSubject = new BehaviorSubject<Despesa[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public totalElements: number;

    constructor(private service: DespesaService) { }

    connect(collectionViewer: CollectionViewer): Observable<Despesa[] | readonly Despesa[]> {
        return this.despesaSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    buscarDespesas(filter = new Filter()) {
        this.loadingSubject.next(true);

        this.service.listar(filter)
            .subscribe((despesas: Despesa[] | any) => {
                const listaDespesas = despesas.content.map((despesa: Despesa) => {
                    return {
                        ...despesa,
                        idDespesa: despesa.idDespesa,
                        dataEntrada: despesa.dataEntrada,
                        dataPagamento: despesa.dataPagamento,
                        dataVencimento: despesa.dataVencimento,
                        descricao: despesa.descricao,
                        valor: despesa.valor,
                        status: StatusPagamento[despesa.statusPagamento]
                    };
                });
                this.totalElements = despesas.totalElements;
                this.despesaSubject.next(listaDespesas);
                this.loadingSubject.next(false);
            }, () => {
                this.despesaSubject.next(new Array<Despesa>());
                this.loadingSubject.next(false);
            });
    }

}