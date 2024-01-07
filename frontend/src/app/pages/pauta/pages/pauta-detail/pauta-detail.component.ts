import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatChipsModule } from '@angular/material/chips'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { CardComponent } from '../../../../@shared/components/card/card.component'
import { Pauta } from '../../../../features/pauta/model/pauta'
import { Session } from '../../../../features/session/model/session'
import { SessionService } from '../../../../features/session/service/session.service'

@Component({
  selector: 'app-pauta-detail',
  standalone: true,
  imports: [CommonModule, CardComponent, MatChipsModule],
  templateUrl: './pauta-detail.component.html',
  styleUrl: './pauta-detail.component.scss'
})
export class PautaDetailComponent implements OnInit, OnDestroy {
  pauta!: Pauta
  session!: Session
  unsubscribe = new Subject<void>()

  constructor(
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params
    this.sessionService
      .getById(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(session => {
        this.pauta = session.pauta as Pauta
        this.session = session
      })
  }

  backToList() {
    this.router.navigate(['pauta', 'list'])
  }

  get sessionDateInfo(): string {
    if (this.isSessionClosed) return 'A sessão fechou dia'

    return 'A sessão está aberta até dia'
  }

  get sessionBadgeInfo(): { text: string; color: string } | undefined {
    if (this.isSessionClosed) {
      const inFavor = this.session.inFavor || 0
      const against = this.session.against || 0

      return inFavor > against
        ? { text: 'Aprovado', color: 'success' }
        : { text: 'Negado', color: 'error' }
    }

    return
  }

  get isSessionClosed(): boolean {
    const currentDate = new Date()
    const closeDate = new Date(this.session.closeDate)

    return closeDate < currentDate
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
