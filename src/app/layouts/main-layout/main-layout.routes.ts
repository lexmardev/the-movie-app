import { Routes } from '@angular/router';

export const MainLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('@modules/movie/presentation/movie.component').then(
        (m) => m.MovieComponent
      ),
    loadChildren: () =>
      import('@modules/movie/presentation/movie.routes').then(
        (m) => m.MovieRoutes
      ),
  },
];
