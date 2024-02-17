import { Injectable } from '@angular/core';
import { IMovie } from '../../modules/movie/domain/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: IMovie[] = [];
  favorites: IMovie[];

  constructor() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');
  }

  setMovies(movies: IMovie[]): void {
    this.movies = movies;
  }

  save(movie: IMovie): IMovie {
    this.movies.push(movie);
    return movie;
  }

  update(movie: IMovie): IMovie {
    const index = this.movies.findIndex((m) => m.id === movie.id);
    this.movies[index] = movie;
    return movie;
  }

  delete(movie: IMovie): IMovie {
    const index = this.movies.findIndex((m) => m.id === movie.id);
    this.movies.splice(index, 1);
    return movie;
  }

  getById(id: string): IMovie {
    return this.movies.find((m) => m.id === id) ?? ({} as IMovie);
  }

  saveToFavorites(movie: IMovie): IMovie {
    if (this.favorites.find((m) => m.id === movie.id)) {
      return movie;
    }

    this.favorites.push(movie);
    this.saveFavoritesToLocalStorage();
    return movie;
  }

  removeFromFavorites(movie: IMovie): IMovie {
    const index = this.favorites.findIndex((m) => m.id === movie.id);
    this.favorites.splice(index, 1);
    this.saveFavoritesToLocalStorage();
    return movie;
  }

  saveFavoritesToLocalStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
