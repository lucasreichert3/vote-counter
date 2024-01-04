import { Component, OnInit } from '@angular/core';
import { PautaListTableComponent } from '../../../../features/pauta/components/pauta-list-table/pauta-list-table.component';
import { PautaService } from '../../../../features/pauta/service/pauta.service';
import { Pauta } from '../../../../features/pauta/model/pauta';

@Component({
  selector: 'app-pauta-list',
  standalone: true,
  imports: [PautaListTableComponent],
  templateUrl: './pauta-list.component.html',
  styleUrl: './pauta-list.component.scss',
})
export class PautaListComponent implements OnInit {
  pautas: Pauta[] = [];

  constructor(private pautaService: PautaService) {}

  ngOnInit(): void {
    this.pautaService.getAll().subscribe(({ data }) => {
      this.pautas = data;
    });
  }
}
