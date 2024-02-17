import { Injectable } from '@angular/core'
import { IMovieRepository } from '../domain/movie.repository'
import { Observable } from 'rxjs'
import { IMovie } from '../domain/movie.interface'
import { MovieService } from '@lib/services/movie.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '@environments/environment'

@Injectable({
	providedIn: 'root',
})
export class MovieInfrastructureService implements IMovieRepository {
	private readonly endpoint: string = environment.API_BASE_URL + '/titles'

	constructor(private readonly http: HttpClient, private readonly movieService: MovieService) {}

	save(movie: IMovie): IMovie {
		return this.movieService.save(movie)
	}

	update(movie: IMovie): IMovie {
		return this.movieService.update(movie)
	}

	delete(movie: IMovie): IMovie {
		return this.movieService.delete(movie)
	}

	getById(id: string): IMovie {
		return this.movieService.getById(id)
	}

	getByPage(page: number): Observable<IMovie[]> {
		return this.http.get<IMovie[]>(this.endpoint, { params: { page: page.toString() } })
	}
}
