import { Routes } from '@angular/router';
import { HomeComponent } from './views/components/home/home.component';
import { ClientesMainComponent } from './views/components/clientes/clientes-main/clientes-main.component';
import { TecnicosMainComponent } from './views/components/tecnicos/tecnicos-main/tecnicos-main.component';
import { TecnicoInsertEditComponent } from './views/components/tecnicos/tecnico-insert-edit/tecnico-insert-edit.component';
import { ClienteInsertEditComponent } from './views/components/clientes/cliente-insert-edit/cliente-insert-edit.component';
import { OsMainComponent } from './views/components/os/os-main/os-main.component';
import { OsInsertEditComponent } from './views/components/os/os-insert-edit/os-insert-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'tecnicos',
    component: TecnicosMainComponent,
  },
  {
    path: 'tecnicos',
    children: [{ path: ':id', component: TecnicoInsertEditComponent }],
  },
  {
    path: 'clientes',
    component: ClientesMainComponent,
  },
  {
    path: 'clientes',
    children: [{ path: ':id', component: ClienteInsertEditComponent }],
  },
  {
    path: 'os',
    component: OsMainComponent,
  },
  {
    path: 'os',
    children: [{ path: ':id', component: OsInsertEditComponent }],
  },
];
