import { Routes } from '@angular/router'
import { canLoadUserLogin, canLoadVote } from './vote.guard'

export const routes: Routes = [
  {
    path: 'user-login/:pautaId',
    loadComponent: () =>
      import('./pages/user-login/user-login.component').then(
        m => m.UserLoginComponent
      ),
    canActivate: [canLoadUserLogin]
  },
  {
    path: ':pautaId',
    loadComponent: () => import('./vote.component').then(m => m.VoteComponent),
    canActivate: [canLoadVote]
  }
]
