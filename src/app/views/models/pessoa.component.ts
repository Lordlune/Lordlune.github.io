export class Pessoa {
  constructor(
    id?: number | undefined | null,
    nome?: string | undefined | null,
    telefone?: string | undefined | null,
    cpf?: string | undefined | null,
    email?: string | undefined | null
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.cpf = cpf;
    this.email = email;
  }

  id?: number | undefined | null;
  nome?: string | undefined | null;
  telefone?: string | undefined | null;
  cpf?: string | undefined | null;
  email?: string | undefined | null;
}
