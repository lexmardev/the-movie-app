import { Observable } from 'rxjs'
import { IMovie } from './movie.interface'
import { IResponse } from '@lib/interfaces/response.interface'

export interface IMovieRepository {
	save(movie: IMovie): IMovie
	update(movie: IMovie): IMovie
	delete(movie: IMovie): IMovie
	getById(id: string): IMovie | null
	getByPage(page: number): Observable<IResponse<IMovie[]>>
}
