import { HttpParams } from '@angular/common/http';
import { AbstractFilter } from './abstract.filter';

export class FaturaFilter extends AbstractFilter {
    idCartao: number;

    constructor(
        page = '0',
        size = '10',
        sort = 'id',
        direction = 'desc',
        idCartao?
    ) {
        super();
        super.page = page;
        super.size = size;
        super.sort = sort;
        super.direction = direction;
        this.idCartao = idCartao;
    }

    static createFilter(sortBy, idCartao): FaturaFilter {
        return new FaturaFilter('0', '10', sortBy, 'desc', idCartao);
    }

    createQueryParams(): HttpParams {
        return new HttpParams()
            .set('page', this.page)
            .set('size', this.size)
            .set('sort', this.sort)
            .set('direction', this.direction)
            .set('idCartao', `${this.idCartao}`)
    }

}
