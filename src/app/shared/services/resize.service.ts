import { Injectable } from '@angular/core';
import { Columns } from '../models/columns';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  constructor() { }

  onResize(event, columns: Columns): string[] {
    if (event.currentTarget) {
      return event.currentTarget.innerWidth >= 768 ?
        columns.desktop : columns.mobile;
    }
  }
}
