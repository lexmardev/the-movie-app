import { Component, OnInit } from '@angular/core'
import { MovieCardComponent } from '../components/movie-card.component'
import { IMovie } from '@modules/movie/domain/movie.interface'
import { MovieService } from '@lib/services/movie.service'
import { RouterLink } from '@angular/router'

@Component({
	selector: 'app-movies-page',
	standalone: true,
	imports: [MovieCardComponent, RouterLink],
	template: `
		<div class="bg-white">
			<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900">Movies</h2>
				<!-- Button to create a new movie -->
				<div class="mb-6 mt-6">
					<a
						[routerLink]="['/movies/new']"
						class="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
					>
						New movie
					</a>
				</div>
				@if (movies.length === 0) {
					<p>There are no movies, please reload the page or add new one</p>
				}
				<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
					@for (item of movies; track $index) {
						<app-movie-card [movie]="item" />
					}
				</div>
			</div>
		</div>
	`,
})
export class MoviesPageComponent implements OnInit {
	movies: IMovie[] = []

	constructor(private readonly movieService: MovieService) {}

	ngOnInit(): void {
		this.movies = this.movieService.movies
	}
}
