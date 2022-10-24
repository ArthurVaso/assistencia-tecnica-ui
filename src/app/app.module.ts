import { CoreModule } from './core/core.module';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { LancamentosListagemComponent } from './lancamentos/lancamentos-listagem/lancamentos-listagem.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './seguranca/auth.service';
import { SegurancaModule } from './seguranca/seguranca.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';

import { ToastModule } from 'primeng/toast'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentosListagemComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'lancamento/:codigo', component: LancamentoCadastroComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    //AppRoutingModule,
    //ButtonModule,
    //TableModule,
    //TooltipModule,

    LancamentosModule,
    SegurancaModule,
    CoreModule,

    //ToastModule,
    //ConfirmDialogModule
  ],
  providers: [
    //AuthService,
    //MessageService,
    //ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
