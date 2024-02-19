import { NgClass } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { MovieImagePipe } from '@lib/pipes/movie-image.pipe'
import { MovieService } from '@lib/services/movie.service'
import { IMovie } from '@modules/movie/domain/movie.interface'
import { MovieControllerService } from '@modules/movie/infrastructure/movie.controller.service'

@Component({
	selector: 'app-movie-card',
	standalone: true,
	imports: [NgClass, MovieImagePipe],
	template: `
		<div class="group">
			<div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
				<img
					src="{{ movie.primaryImage?.url | movieImage }}"
					alt="Movie image"
					class="h-full w-full object-cover object-center"
				/>
				<div class="flex h-full w-full flex-col justify-end">
					<div class="flex h-1/2 w-full flex-col justify-end bg-gradient-to-t from-black to-transparent">
						<h1 class="w-full pb-4 text-center text-2xl font-bold text-white">{{ movie.titleText?.text }}</h1>
						<div class="flex flex-row justify-between">
							<button (click)="deleteMovie()" class="cursor-pointer pb-4 pl-4">
								<i class="i-tabler-trash h-8 w-8 text-gray-400 hover:scale-110"></i>
							</button>
							<button (click)="toggleFavorite()" class="cursor-pointer pb-4 pr-4">
								<i
									class="i-tabler-heart h-8 w-8 text-gray-400"
									[ngClass]="{
										'!text-red-500': movie.isFavorite
									}"
								></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class MovieCardComponent implements OnInit {
	@Input() movie!: IMovie

	constructor(private readonly movieController: MovieControllerService) {}

	ngOnInit(): void {
		if (!this.movie) {
			throw new Error('Movie is required')
		}
	}

	toggleFavorite(): void {
		this.movie.isFavorite = !this.movie.isFavorite
	}

	deleteMovie(): void {
		this.movieController.delete(this.movie)
	}
}
