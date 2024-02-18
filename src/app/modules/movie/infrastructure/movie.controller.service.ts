import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { MovieApplicationService } from '../application/movie.application.service'
import { IMovie } from '../domain/movie.interface'
import { IResponse } from '@lib/interfaces/response.interface'

@Injectable({
	providedIn: 'root',
})
export class MovieControllerService {
	constructor(private readonly application: MovieApplicationService) {}

	save(movie: IMovie): IMovie {
		return this.application.save(movie)
	}

	update(movie: IMovie): IMovie {
		return this.application.update(movie)
	}

	delete(movie: IMovie): IMovie {
		return this.application.delete(movie)
	}

	getById(id: string): IMovie {
		return this.application.getById(id)
	}

	getByPage(page: number): Observable<IResponse<IMovie[]>> {
		return this.application.getByPage(page)
	}
}
