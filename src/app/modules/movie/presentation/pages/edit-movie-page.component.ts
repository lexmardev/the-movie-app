import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IMovie } from '@modules/movie/domain/movie.interface'
import { MovieControllerService } from '@modules/movie/infrastructure/movie.controller.service'
import { MovieFormComponent } from '../components/movie-form.component'

@Component({
	selector: 'app-edit-movie-page',
	standalone: true,
	imports: [MovieFormComponent],
	template: `
		@if (movie) {
			<app-movie-form [movie]="movie"></app-movie-form>
		} @else {
			<p class="text-center">Movie not found :(</p>
		}
	`,
})
export class EditMoviePageComponent implements OnInit {
	movie!: IMovie | null

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly movieController: MovieControllerService
	) {}

	ngOnInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('id')

		if (id) {
			this.movie = this.movieController.getById(id)
		}
	}
}
