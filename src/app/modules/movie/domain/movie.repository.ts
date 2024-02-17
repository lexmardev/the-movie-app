import { Observable } from 'rxjs';
import { IMovie } from './movie.interface';

export interface IMovieRepository {
  save(movie: IMovie): IMovie;
  update(movie: IMovie): IMovie;
  delete(movie: IMovie): IMovie;
  getById(id: string): IMovie;
  getByPage(page: number): Observable<IMovie[]>;
}
