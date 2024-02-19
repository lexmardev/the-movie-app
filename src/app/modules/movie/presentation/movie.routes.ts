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
	{
		path: 'new',
		loadComponent: () => import('./pages/new-movie-page.component').then((m) => m.NewMoviePageComponent),
	},
	{
		path: 'edit/:id',
		loadComponent: () => import('./pages/edit-movie-page.component').then((m) => m.EditMoviePageComponent),
	},
]
