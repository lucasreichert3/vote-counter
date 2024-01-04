import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pauta',
    loadChildren: () =>
      import('./pages/pauta/pauta.routes').then((mod) => mod.routes),
  },
];
