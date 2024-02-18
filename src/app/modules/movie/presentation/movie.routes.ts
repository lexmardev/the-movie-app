import { Routes } from '@angular/router'

export const MovieRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/movies-page.component').then((m) => m.MoviesPageComponent),
	},
	{
		path: 'favorites',
		loadComponent: () => import('./pages/favorites-movies-page.component').then((m) => m.FavoritesMoviesPageComponent),
	},
]
