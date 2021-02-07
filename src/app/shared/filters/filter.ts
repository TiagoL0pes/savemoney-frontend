import { AbstractFilter } from './abstract.filter';

export class Filter extends AbstractFilter {
    mes: number;
    ano: number;

    constructor(
        page = '0',
        size = '10',
        sort = 'id',
        direction = 'desc',
        mes = new Date().getMonth(),
        ano = new Date().getFullYear()
    ) {
        super();
        super.page = page;
        super.size = size;
        super.sort = sort;
        super.direction = direction;
        this.mes = mes;
        this.ano = ano;
    }

    static createFilter(sortBy, mes?, ano?): Filter {
        return new Filter('0', '10', sortBy, 'asc',
            mes,
            ano);
    }


}
