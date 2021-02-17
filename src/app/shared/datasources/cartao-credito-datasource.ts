import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../filters/filter';
import { CartaoCredito } from '../models/cartao-credito';
import { CartaoCreditoService } from '../services/cartao-credito.service';

export class CartaoCreditoDatasource implements DataSource<CartaoCredito> {
    private cartaoSubject = new BehaviorSubject<CartaoCredito[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private loading$ = this.loadingSubject.asObservable();

    public totalElements: number;

    constructor(private service: CartaoCreditoService) { }

    buscarCartoesCredito(filter = new Filter()) {
        this.service.listar(filter)
            .subscribe((cartoes: CartaoCredito[] | any) => {
                const listaCartoes = cartoes.content.map((cartao: CartaoCredito) => {
                    return {
                        ...cartao,
                        idCartaoCredito: cartao.idCartaoCredito,
                        numnumerober: cartao.numero,
                        diaVencimento: cartao.diaVencimento,
                        limiteCredito: cartao.limiteCredito,
                        contaBancaria: cartao.contaBancaria
                    };
                });
                this.totalElements = cartoes.totalElements;
                this.cartaoSubject.next(listaCartoes);
            }, error => {
                console.error(error);
                this.cartaoSubject.next(new Array<CartaoCredito>());
            })
    }

    connect(collectionViewer: CollectionViewer): Observable<CartaoCredito[] | readonly CartaoCredito[]> {
        return this.cartaoSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.cartaoSubject.complete();
        this.loadingSubject.complete();
    }

}