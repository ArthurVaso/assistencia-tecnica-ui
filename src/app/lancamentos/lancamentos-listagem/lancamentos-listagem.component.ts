import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-listagem',
  templateUrl: './lancamentos-listagem.component.html',
  styleUrls: ['./lancamentos-listagem.component.css']
})
export class LancamentosListagemComponent implements OnInit {

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '31/08/2022',
      dataPagamento: null, valor: 4.55, pessoa: 'Juliana da Silva' },
    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: '20/08/2022',
      dataPagamento: null, valor: 1431, pessoa: 'Eliana dos Santos' },
    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '10/08/2022',
      dataPagamento: '09/08/2022', valor: 1750, pessoa: 'Mariana Ferreira' },
    { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '15/08/2022',
      dataPagamento: '10/08/2022', valor: 180, pessoa: 'Ana Lima' },
    { tipo: 'RECEITA', descricao: 'Salário mensal', dataVencimento: '15/08/2022',
      dataPagamento: null, valor: 1800, pessoa: 'Ana Lima' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
