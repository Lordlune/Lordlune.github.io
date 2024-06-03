import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../../../shared/generic-service/generic.service';
import { Pessoa } from '../../../models/pessoa.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'table-component',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterViewInit {
  @Input('displayedColumns') displayedColumns: string[] = [
    'id',
    'nome',
    'telefone',
    'cpf',
    'acoes',
  ];
  @Input('endpoint') endpoint: string = '';
  @Input('identificador') indentificador: string = '';
  dataList: Pessoa[] = [];
  dataSource = new MatTableDataSource<Pessoa>(this.dataList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  routePath: string = '';

  constructor(
    protected http: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.getAll();
    this.route.url.subscribe((resp) => {
      this.routePath = resp[0].path;
    });
  }

  getAll() {
    this.http.findAll(this.endpoint).subscribe((resp: any) => {
      this.dataList = resp;
      this.dataSource = new MatTableDataSource<Pessoa>(this.dataList);
      this.dataSource.paginator = this.paginator;
    });
  }

  create() {
    this.router.navigate([`${this.endpoint}/novo`]);
  }

  delete(el: any) {
    Swal.fire({
      title: 'Atenção',
      text: 'Esse dado será deletado, deseja prosseguir?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      cancelButtonColor: 'red',
      confirmButtonColor: 'blue',
    }).then((button) => {
      if (button.isConfirmed) {
        this.http.delete(`${this.routePath}/${el.id}`).subscribe((resp) => {
          this.getAll();
          this.http.message('Dado deletado com sucesso');
        });
      }
    });
  }

  edit(el: any) {
    this.router.navigate([`${this.routePath}/${el.id}`]);
  }
}
