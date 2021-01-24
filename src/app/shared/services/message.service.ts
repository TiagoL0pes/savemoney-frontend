import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  showSuccessMessage(title = 'Operação realizada com sucesso', position?): void {
    Swal.fire({
      position: position || 'center',
      icon: 'success',
      title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showLogoutMessage(title = 'Logout realizado com sucesso!', position?): void {
    Swal.fire({
      position: position || 'center',
      icon: 'info',
      title,
      showConfirmButton: false,
      timer: 1000
    });
  }

  showErrorMessage(title = 'Ops', text = 'Algo deu errado'): void {
    Swal.fire({
      icon: 'error',
      title,
      text
    });
  }

  showConfirmDialog(
    title = 'Você tem certeza ?',
    text = 'Você não conseguirá reverter essa operação!',
    confirmButtonText = 'Sim, remover!'): Observable<SweetAlertResult> {
    const promise = Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    });
    return from(promise);
  }

  showDeleteMessage(message = 'Removido com sucesso'): void {
    Swal.fire(
      'Removido!',
      message,
      'success'
    );
  }
}
