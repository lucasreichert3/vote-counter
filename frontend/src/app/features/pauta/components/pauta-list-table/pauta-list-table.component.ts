import { Component, Input } from '@angular/core';
import { Pauta } from '../../model/pauta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pauta-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pauta-list-table.component.html',
  styleUrl: './pauta-list-table.component.scss',
})
export class PautaListTableComponent {
  @Input()
  pautas: Pauta[] = [];
}
