import { Component, OnInit } from '@angular/core'
import { MovieService } from '@lib/services/movie.service'
import { MovieCardComponent } from '../components/movie-card.component'
import { IMovie } from '@modules/movie/domain/movie.interface'

@Component({
	selector: 'app-favorites-movies-page',
	standalone: true,
	imports: [MovieCardComponent],
	template: `
		<div class="bg-white">
			<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				@if (getFavorites().length === 0) {
					<p class="text-center text-3xl font-bold tracking-tight text-gray-900">No favorite movies</p>
				} @else {
					<p class="text-center text-3xl font-bold tracking-tight text-gray-900">Favorite movies</p>
				}
				<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
					@for (item of getFavorites(); track $index) {
						@if (item.isFavorite) {
							<app-movie-card [movie]="item" />
						}
					}
				</div>
			</div>
		</div>
	`,
})
export class FavoritesMoviesPageComponent implements OnInit {
	movies: IMovie[] = []

	constructor(private readonly movieService: MovieService) {}

	ngOnInit(): void {
		this.movies = this.movieService.movies
	}

	getFavorites(): IMovie[] {
		return this.movies.filter((movie) => movie.isFavorite)
	}
}
