import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-tecnicos-main',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tecnicos-main.component.html',
  styleUrl: './tecnicos-main.component.css',
})
export class TecnicosMainComponent {}
