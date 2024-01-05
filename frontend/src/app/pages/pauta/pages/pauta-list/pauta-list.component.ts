import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { EmptyStateComponent } from '../../../../@shared/components/empty-state/empty-state.component'
import { PautaListHeaderComponent } from '../../../../features/pauta/components/pauta-list-header/pauta-list-header.component'
import { PautaListTableComponent } from '../../../../features/pauta/components/pauta-list-table/pauta-list-table.component'
import {
  Pauta,
  PautaSessionStatus
} from '../../../../features/pauta/model/pauta'
import { PautaService } from '../../../../features/pauta/service/pauta.service'
import { UserSessionService } from '../../../../@core/service/user-session.service'

@Component({
  selector: 'app-pauta-list',
  standalone: true,
  imports: [
    PautaListTableComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    EmptyStateComponent,
    MatButtonModule,
    PautaListHeaderComponent
  ],
  templateUrl: './pauta-list.component.html',
  styleUrl: './pauta-list.component.scss'
})
export class PautaListComponent implements OnInit, OnDestroy {
  pautas: Pauta[] = []
  total: number = 0
  currentPage = 0
  loading = false
  unSubscribe = new Subject<void>()
  searchValue = ''

  constructor(
    private pautaService: PautaService,
    private router: Router,
    private userSessionService: UserSessionService
  ) {}

  ngOnInit(): void {
    this.loadPautas()
    this.userSessionService.removeUser()
  }

  handleSearch(value: string) {
    this.searchValue = value
    this.loadPautas(value)
  }

  get emptyStateInfo() {
    if (this.searchValue) {
      return {
        title: 'Nenhuma pauta encontrada',
        description: 'Tente buscar por outro termo.'
      }
    }

    return {
      title: 'Nenhuma pauta cadastrada',
      description: 'Cadastre uma nova pauta para iniciar a votação.',
      buttonLabel: 'Criar pauta'
    }
  }

  loadPautas(category?: string) {
    this.loading = true
    this.pautaService
      .getAll(this.currentPage, 10, PautaSessionStatus.OPEN, category)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe({
        next: ({ data, total }) => {
          this.pautas = data
          this.total = total
          this.loading = false
        },
        error: () => (this.loading = false)
      })
  }

  handlePage(event: PageEvent) {
    const { pageIndex } = event

    this.currentPage = pageIndex

    this.loadPautas()
  }

  redirectToCreatePauta() {
    this.router.navigate(['pauta', 'form'])
  }

  redirectToVote(pauta: Pauta) {
    this.router.navigate(['vote', pauta.id])
  }

  ngOnDestroy(): void {
    this.unSubscribe.next()
    this.unSubscribe.complete()
  }
}
