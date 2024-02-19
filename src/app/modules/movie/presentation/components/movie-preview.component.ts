import { Component, Input } from '@angular/core'
import { MovieImagePipe } from '@lib/pipes/movie-image.pipe'
import { IMovie } from '@modules/movie/domain/movie.interface'

@Component({
	selector: 'app-movie-preview',
	standalone: true,
	imports: [MovieImagePipe],
	template: `
		<div class="bg-white">
			<div class="mx-auto max-w-sm px-4 py-16 sm:px-6 sm:py-24">
				<h1 class="mb-4 w-full text-center text-2xl">Movie preview</h1>
				<div class="grid grid-cols-1">
					<div class="group">
						<div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
							<img
								src="{{ movie?.primaryImage?.url | movieImage }}"
								alt="Movie image"
								class="h-full w-full object-cover object-center"
							/>
							<div class="flex h-full w-full flex-col justify-end">
								<div class="flex h-1/2 w-full flex-col justify-end bg-gradient-to-t from-black to-transparent">
									<h1 class="w-full pb-4 text-center text-2xl font-bold text-white">{{ movie?.titleText?.text }}</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class MoviePreviewComponent {
	@Input() movie!: IMovie | null
}
