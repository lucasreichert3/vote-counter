import { Component, OnInit } from '@angular/core';
import { PautaListTableComponent } from '../../../../features/pauta/components/pauta-list-table/pauta-list-table.component';
import { PautaService } from '../../../../features/pauta/service/pauta.service';
import { Pauta } from '../../../../features/pauta/model/pauta';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pauta-list',
  standalone: true,
  imports: [PautaListTableComponent, MatPaginatorModule],
  templateUrl: './pauta-list.component.html',
  styleUrl: './pauta-list.component.scss',
})
export class PautaListComponent implements OnInit {
  pautas: Pauta[] = [];
  total: number = 0;
  currentPage = 0;

  constructor(private pautaService: PautaService) {}

  ngOnInit(): void {
    this.loadPautas();
  }

  loadPautas() {
    this.pautaService.getAll(this.currentPage).subscribe(({ data, total }) => {
      this.pautas = data;
      this.total = total;
    });
  }

  handlePage(event: PageEvent) {
    const { pageIndex } = event;

    this.currentPage = pageIndex;

    this.loadPautas();
  }
}
