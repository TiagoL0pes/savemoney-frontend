import { Injectable } from '@angular/core';
import { ContaBancariaInfo } from '../models/conta-bancaria-info';
import { STORAGE_KEYS } from '../utils/storage_keys';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getContaBancariaLocal(): ContaBancariaInfo {
    let contaBancaria = localStorage.getItem(STORAGE_KEYS.contaBancaria);
    return contaBancaria ? JSON.parse(contaBancaria) : null;
  }

  setContaBancariaLocal(contaBancaria: ContaBancariaInfo): void {
    contaBancaria ?
      localStorage.setItem(STORAGE_KEYS.contaBancaria, JSON.stringify(contaBancaria)) :
      localStorage.removeItem(STORAGE_KEYS.contaBancaria);
  }
}