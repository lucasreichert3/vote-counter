import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, Router } from '@angular/router'
import { UserSessionService } from '../../@core/service/user-session.service'
import { CardComponent } from '../../@shared/components/card/card.component'
import { Pauta } from '../../features/pauta/model/pauta'
import { SessionService } from '../../features/session/service/session.service'
import { VoteService } from '../../features/vote/service/vote.service'

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [MatButtonModule, CommonModule, CardComponent],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent implements OnInit {
  pauta?: Pauta

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private voteService: VoteService,
    private userSessionService: UserSessionService
  ) {}

  ngOnInit(): void {
    this.getPautaInfo()
  }

  getPautaInfo() {
    const { sessionId } = this.activatedRoute.snapshot.params
    this.sessionService.getById(sessionId).subscribe(({ pauta }) => {
      this.pauta = pauta
    })
  }

  handleVote(vote: boolean) {
    const { sessionId } = this.activatedRoute.snapshot.params
    const user = this.userSessionService.getUser()
    this.voteService
      .create({ sessionId, userId: user?.cpf as string, vote })
      .subscribe(() => {
        this.backToList()
      })
  }

  backToList() {
    this.router.navigate(['pauta', 'list'])
  }
}
