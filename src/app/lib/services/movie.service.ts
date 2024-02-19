import { Injectable } from '@angular/core'
import { IMovie } from '../../modules/movie/domain/movie.interface'

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	movies: IMovie[] = []

	constructor() {}

	setMovies(movies: IMovie[]): void {
		this.movies = movies
	}

	save(movie: IMovie): IMovie {
		movie.id = Date.now().toString()
		this.movies.push(movie)
		return movie
	}

	update(movie: IMovie): IMovie {
		const index = this.movies.findIndex((m) => m.id === movie.id)
		this.movies[index] = movie
		return movie
	}

	delete(movie: IMovie): IMovie {
		const index = this.movies.findIndex((m) => m.id === movie.id)
		this.movies.splice(index, 1)
		return movie
	}

	getById(id: string): IMovie | null {
		return this.movies.find((m) => m.id === id) ?? null
	}
}
