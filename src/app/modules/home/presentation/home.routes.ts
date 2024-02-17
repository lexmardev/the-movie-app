import { Routes } from '@angular/router';

export const HomeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/home.component').then((m) => m.HomeComponent),
  },
];
