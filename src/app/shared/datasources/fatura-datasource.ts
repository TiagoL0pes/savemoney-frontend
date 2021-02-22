import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatusPagamento } from '../enums/status-pagamento.enum';
import { FaturaFilter } from '../filters/fatura-filter';
import { Fatura } from '../models/fatura';
import { FaturaService } from '../services/fatura.service';
import { MessageService } from '../services/message.service';

export class FaturaDatasource implements DataSource<Fatura> {
    private faturaSubject = new BehaviorSubject<Fatura[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private loading$ = this.loadingSubject.asObservable();

    public totalElements: number;

    constructor(
        private faturaService: FaturaService,
        private messageService: MessageService
    ) { }

    buscarFaturas(filter = new FaturaFilter()) {
        this.faturaService.listar(filter)
            .subscribe((faturas: Fatura[] | any) => {
                const listaFaturas = faturas.content.map((fatura: Fatura) => {
                    return {
                        ...fatura,
                        idFatura: fatura.idFatura,
                        parcelas: fatura.parcelas,
                        dataVencimento: fatura.dataVencimento,
                        statusPagamento: StatusPagamento[fatura.statusPagamento],
                        total: fatura.total
                    };
                });
                this.totalElements = faturas.totalElements;
                this.faturaSubject.next(listaFaturas);
            }, handler => {
                this.messageService.showErrorMessage('Ops', handler.error.message);
                this.faturaSubject.next(new Array<Fatura>());
            })
    }

    connect(collectionViewer: CollectionViewer): Observable<Fatura[] | readonly Fatura[]> {
        return this.faturaSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.faturaSubject.complete();
        this.loadingSubject.complete();
    }

}