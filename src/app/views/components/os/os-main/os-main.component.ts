import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { OS } from '../../../models/os.componet';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GenericService } from '../../../../shared/generic-service/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pessoa } from '../../../models/pessoa.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-os-main',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './os-main.component.html',
  styleUrl: './os-main.component.css',
})
export class OsMainComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'tecnico',
    'cliente',
    'abertura',
    'fechamento',
    'propriedade',
    'status',
    'acoes',
  ];
  dataList: OS[] = [];
  dataSource = new MatTableDataSource<OS>(this.dataList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('modal') modal!: MatDialog;

  modalContent: any;

  routePath: string = '';

  constructor(
    private http: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.getAll();
    this.route.url.subscribe((resp) => {
      this.routePath = resp[0].path;
    });
  }

  getAll() {
    this.http.findAll('os').subscribe((resp: any) => {
      this.dataList = resp;
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.dataList);
      this.dataSource.paginator = this.paginator;
    });
  }

  create() {
    this.router.navigate([`os/novo`]);
  }

  edit(el: any) {
    this.router.navigate([`${this.routePath}/${el.id}`]);
  }

  listarTecnico() {
    let tecnicos = [];
    this.http.findAll<Pessoa[]>('tecnicos').subscribe((resp: Pessoa[]) => {
      tecnicos = resp;
      tecnicos.forEach((x) => {
        this.dataList.find((y) => {
          if (y.tecnico == x.id) {
            y.tecnico = x;
          }
        });
      });
    });
  }

  listarCliente() {
    let clientes = [];
    this.http.findAll<Pessoa[]>('clientes').subscribe((resp: Pessoa[]) => {
      clientes = resp;
      clientes.forEach((x) => {
        this.dataList.find((y) => {
          if (y.cliente == x.id) {
            y.cliente = x;
          }
        });
      });
    });
  }

  filter(identificador: 'TODOS' | 'ABERTO' | 'ENCERRADO') {
    let newDataList: OS[] = [];

    if (identificador == 'ABERTO') {
      this.dataList.filter((x, i) => {
        if (x.status == 'ABERTO') {
          newDataList.push(x);
          this.dataSource = new MatTableDataSource<OS>(newDataList);
        }
      });
    } else if (identificador == 'ENCERRADO') {
      this.dataList.map((x) => {
        if (x.status != 'ABERTO') {
          newDataList.push(x);
          this.dataSource = new MatTableDataSource<OS>(newDataList);
        }
      });
    } else {
      this.getAll();
    }
  }

  prioridade(x: any) {
    if (x == 'BAIXA') {
      return 'baixa';
    } else if (x == 'MEDIA') {
      return 'media';
    } else {
      return 'alta';
    }
  }

  openDialog(modal: any, id: string | number) {
    this.dialog.open(modal, {
      height: '300px',
      width: '700px',
    });
    this.modalContent = this.dataList.find((x) => x.id == id);
  }
}
