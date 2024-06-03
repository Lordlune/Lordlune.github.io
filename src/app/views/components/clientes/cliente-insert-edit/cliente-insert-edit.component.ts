import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { Pessoa } from '../../../models/pessoa.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../../../shared/generic-service/generic.service';

@Component({
  selector: 'app-cliente-insert-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cliente-insert-edit.component.html',
  styleUrl: './cliente-insert-edit.component.css',
})
export class ClienteInsertEditComponent implements OnInit {
  durationInSeconds = 2;

  data = new Pessoa();

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
  });

  routeId: string | number = '';

  constructor(
    private router: Router,
    private http: GenericService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.routeId = params['id'];
    });
  }

  ngOnInit(): void {
    if (this.routeId != 'novo') {
      this.http
        .findById<Pessoa>(this.routeId, 'clientes')
        .subscribe((resp: Pessoa) => {
          this.data = resp;
          this.formPatchValue();
        });
    }
  }

  formPatchValue() {
    this.form.patchValue({
      ...this.data,
    });
  }

  saveOrUpdate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formV = this.form.value;
    this.data = {
      ...this.data,
      ...formV,
    };

    this.http.saveOrUpdate<Pessoa>('clientes', this.data).subscribe(
      (resp) => {
        this.http.message(
          this.data.id != null
            ? 'Cliente alterado com sucesso'
            : 'Cliente criado com sucesso'
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
    this.router.navigate(['clientes']);
  }
}
