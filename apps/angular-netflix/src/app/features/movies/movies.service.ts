import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieResponse } from './models/movies.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class MoviesService {

  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);

  selectedMovie = signal<Movie | null>(null);

  private readonly _apiKey = environment.API_KEY ;
  private readonly _apiUrl = environment.API_URL;
  // private readonly _searchTerm = signal<string>('');

  private readonly _http = inject(HttpClient);

  constructor() {
    this._getMovies();
  }

  getMovieById( movieId: string ): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._apiUrl}/movie/${movieId}?api_key=${this._apiKey}`);
  }

  private _getMovies(): void {
    this._http.get<MovieResponse>(`${this._apiUrl}/movie/popular?api_key=${this._apiKey}`)
      .pipe(tap((response) => this.movies.set(response.results))).subscribe();
  }

}
