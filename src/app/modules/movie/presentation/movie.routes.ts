import { Routes } from '@angular/router';

export const MovieRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/movies-page.component').then(
        (m) => m.MoviesPageComponent
      ),
  },
];
