import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pauta.component').then(m => m.PautaComponent),
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./pages/pauta-list/pauta-list.component').then(
            m => m.PautaListComponent
          )
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./pages/pauta-form/pauta-form.component').then(
            m => m.PautaFormComponent
          )
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/pauta-detail/pauta-detail.component').then(
            m => m.PautaDetailComponent
          )
      }
    ]
  }
]
