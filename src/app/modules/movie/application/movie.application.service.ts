import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieInfrastructureService } from '../infrastructure/movie.infra.service';
import { IMovieRepository } from '../domain/movie.repository';
import { IMovie } from '../domain/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieApplicationService {
  constructor(
    @Inject(MovieInfrastructureService)
    private readonly repository: IMovieRepository
  ) {}

  save(movie: IMovie): IMovie {
    return this.repository.save(movie);
  }

  update(movie: IMovie): IMovie {
    return this.repository.update(movie);
  }

  delete(movie: IMovie): IMovie {
    return this.repository.delete(movie);
  }

  getById(id: string): IMovie {
    return this.repository.getById(id);
  }

  getByPage(page: number): Observable<IMovie[]> {
    return this.repository.getByPage(page);
  }
}
