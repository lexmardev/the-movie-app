import { Component, OnInit } from '@angular/core'
import { MovieCardComponent } from '../components/movie-card.component'
import { IMovie } from '@modules/movie/domain/movie.interface'
import { MovieService } from '@lib/services/movie.service'

@Component({
	selector: 'app-movies-page',
	standalone: true,
	imports: [MovieCardComponent],
	template: `
		<div class="bg-white">
			<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
