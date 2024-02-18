import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './components/header.component'
import { MovieService } from '@lib/services/movie.service'
import { MovieControllerService } from '@modules/movie/infrastructure/movie.controller.service'

@Component({
	selector: 'app-main-layout',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent],
	template: `
		@if (canLoadContent) {
			<div class="flex flex-col">
				<app-header />
				<div class="mt-4 flex flex-col">
					<router-outlet />
				</div>
			</div>
		}
	`,
})
export class MainLayoutComponent implements OnInit {
	canLoadContent = false

	constructor(
		private readonly movieService: MovieService,
		private readonly movieController: MovieControllerService
	) {}

	ngOnInit(): void {
		this.movieController.getByPage(1).subscribe((response: any) => {
			this.movieService.movies = response.results
			this.canLoadContent = true
		})
	}
}
