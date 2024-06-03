import { OsService } from './../os.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OS } from '../../../models/os.componet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../../../shared/generic-service/generic.service';
import { SharedModule } from '../../../../shared/shared.module';
import { Pessoa } from '../../../models/pessoa.component';

@Component({
  selector: 'app-os-insert-edit',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './os-insert-edit.component.html',
  styleUrl: './os-insert-edit.component.css',
})
export class OsInsertEditComponent implements OnInit {
  durationInSeconds = 2;

  data: OS = new OS();

  listaClientes: Pessoa[] = [];
  listaTecnicos: Pessoa[] = [];
  listEnumPrioridade = [
    { id: 0, name: 'Baixa' },
    { id: 1, name: 'Média' },
    { id: 2, name: 'Alta' },
  ];
  listEnumStatus = [
    { id: 0, name: 'Aberto' },
    { id: 1, name: 'Andamento' },
    { id: 2, name: 'Encerrado' },
  ];

  form = new FormGroup({
    cliente: new FormControl('', Validators.required),
    tecnico: new FormControl('', Validators.required),
    observacoes: new FormControl('', Validators.required),
  });

  routeId: string | number = '';

  constructor(
    private router: Router,
    private http: OsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.routeId = params['id'];
    });
    http.findAll<Pessoa[]>('clientes').subscribe((resp: Pessoa[]) => {
      this.listaClientes = resp;
    });
    http.findAll<Pessoa[]>('tecnicos').subscribe((resp: Pessoa[]) => {
      this.listaTecnicos = resp;
    });
  }

  ngOnInit(): void {
    if (this.routeId != 'novo') {
      this.http.findById<OS>(this.routeId, 'os').subscribe((resp: any) => {
        this.data = resp;
        this.form.patchValue({
          ...resp,
        });
        this.converteEnum();
      });
    }
  }

  saveOrUpdate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dataV = {
      ...this.data,
      ...this.form.value,
      prioridade: this.data.prioridade,
      status: this.data.status,
    };

    this.http.saveOrUpdate<OS>('os', dataV).subscribe(
      (resp) => {
        this.http.message(
          this.data.id != null
            ? 'Ordem de Serviço alterado com sucesso'
            : 'Ordem de Serviço criado com sucesso'
        );
        this.voltar();
      },
      (err) => {
        if (err.error.status == 400) {
          this.http.message(err.error.error);
          return;
        }
      }
    );
  }

  voltar() {
    this.router.navigate(['os']);
  }

  converteEnum() {
    const status = this.data.status
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const prioridade = this.data.prioridade
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.listEnumStatus.findIndex((x) => {
      if (
        x.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') == status
      ) {
        this.data.status = x.id;
      }
    });
    this.listEnumPrioridade.findIndex((x) => {
      if (
        x.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') == prioridade
      ) {
        this.data.prioridade = x.id;
      }
    });
  }
}
