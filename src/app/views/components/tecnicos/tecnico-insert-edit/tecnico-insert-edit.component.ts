import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../../../shared/generic-service/generic.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pessoa } from '../../../models/pessoa.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tecnico-insert-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tecnico-insert-edit.component.html',
  styleUrl: './tecnico-insert-edit.component.css',
})
export class TecnicoInsertEditComponent implements OnInit {
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
        .findById<Pessoa>(this.routeId, 'tecnicos')
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

    this.http.saveOrUpdate<Pessoa>('tecnicos', this.data).subscribe(
      (resp) => {
        this.http.message(
          this.data.id != null
            ? 'Técnico alterado com sucesso'
            : 'Técnico criado com sucesso'
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
    this.router.navigate(['tecnicos']);
  }
}
