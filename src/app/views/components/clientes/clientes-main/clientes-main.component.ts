import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-clientes-main',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './clientes-main.component.html',
  styleUrl: './clientes-main.component.css',
})
export class ClientesMainComponent {}
