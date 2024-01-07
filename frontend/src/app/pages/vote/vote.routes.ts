import { Routes } from '@angular/router'
import { canLoadUserLogin, canLoadVote } from './vote.guard'

export const routes: Routes = [
  {
    path: 'user-login/:sessionId',
    loadComponent: () =>
      import('./pages/user-login/user-login.component').then(
        m => m.UserLoginComponent
      ),
    canActivate: [canLoadUserLogin]
  },
  {
    path: ':sessionId',
    loadComponent: () => import('./vote.component').then(m => m.VoteComponent),
    canActivate: [canLoadVote]
  }
]
