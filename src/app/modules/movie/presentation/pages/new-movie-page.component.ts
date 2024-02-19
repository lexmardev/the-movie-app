import { Component } from '@angular/core'
import { MovieFormComponent } from '../components/movie-form.component'

@Component({
	selector: 'app-new-movie-page',
	standalone: true,
	imports: [MovieFormComponent],
	template: ` <app-movie-form /> `,
	styles: ``,
})
export class NewMoviePageComponent {}
