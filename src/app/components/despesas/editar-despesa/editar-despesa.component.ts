import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Route } from 'src/app/shared/enums/route.enum';
import { Despesa } from 'src/app/shared/models/despesa';
import { DespesaService } from 'src/app/shared/services/despesa.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { formatarData } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styleUrls: ['./editar-despesa.component.scss']
})
export class EditarDespesaComponent implements OnInit, OnDestroy {
  despesaForm: FormGroup;
  title = 'Editar Despesa';
  idDespesa: number;
  actionButton: string = 'Atualizar';
  subscriptions: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.despesaForm = this.despesaService.criarFormulario(new Despesa(), this.formBuilder);
    this.idDespesa = this.activatedRoute.snapshot.params.idDespesa;

    if (this.idDespesa) {
      const obs$ = this.despesaService.buscarPorId(this.idDespesa)
        .subscribe((despesa: Despesa) =>
          this.despesaForm = this.despesaService.criarFormulario(despesa, this.formBuilder),
          handler => this.messageService.showErrorMessage('Ops', handler.error.message));
      this.subscriptions.add(obs$);
    }
  }

  atualizar(despesa: Despesa): void {
    despesa.dataEntrada = formatarData(despesa.dataEntrada);
    despesa.dataVencimento = formatarData(despesa.dataVencimento);

    const obs$ = this.despesaService.atualizar(despesa)
      .subscribe(response => {
        this.messageService.showSuccessMessage('Despesa atualizada com sucesso!');
        this.router.navigateByUrl(Route.DESPESA);
      }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
    this.subscriptions.add(obs$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
