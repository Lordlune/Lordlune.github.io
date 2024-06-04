import { Pessoa } from './pessoa.component';

export class OS {
  constructor(
    id?: number | string,
    dataAbertura?: string,
    dataFechamento?: string,
    prioridade?: any,
    status?: any,
    tecnico?: Pessoa,
    cliente?: Pessoa,
    observacoes?: string
  ) {
    this.id = id;
    this.dataAbertura = dataAbertura;
    this.dataFechamento = dataFechamento;
    this.prioridade = prioridade;
    this.status = status;
    this.tecnico = tecnico;
    this.cliente = cliente;
    this.observacoes = observacoes;
  }

  id?: number | string;
  dataAbertura?: string;
  dataFechamento?: string;
  prioridade?: any;
  status?: any;
  tecnico?: Pessoa;
  cliente?: Pessoa;
  observacoes?: string;
}
