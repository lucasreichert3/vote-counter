import { Component, Input } from '@angular/core';
import { Pauta } from '../../model/pauta';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-pauta-list-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './pauta-list-table.component.html',
  styleUrl: './pauta-list-table.component.scss',
})
export class PautaListTableComponent {
  @Input()
  pautas: Pauta[] = [];
}
