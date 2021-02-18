import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '../filters/filter';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {

  constructor() { }

  queryParams(filter: Filter): HttpParams {
    return new HttpParams()
      .set('page', filter.page)
      .set('size', filter.size)
      .set('sort', filter.sort)
      .set('direction', filter.direction)
      .set('mes', `${filter.mes + 1}`)
      .set('ano', `${filter.ano}`);
  }
}
