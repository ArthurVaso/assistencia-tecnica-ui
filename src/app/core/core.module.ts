import { RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { AuthService } from './../seguranca/auth.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,

    ToastModule,
    ConfirmDialogModule,

    RouterModule
  ],
  providers: [
    AuthService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    ErrorHandlerService,

    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule
  ]
})
export class CoreModule { }
