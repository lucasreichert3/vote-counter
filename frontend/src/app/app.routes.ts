import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'pauta',
    loadChildren: () =>
      import('./pages/pauta/pauta.routes').then(mod => mod.routes)
  },
  {
    path: 'vote',
    loadChildren: () =>
      import('./pages/vote/vote.routes').then(mod => mod.routes)
  }
]
