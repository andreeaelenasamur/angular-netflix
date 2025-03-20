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

  currentPage = signal<number>(1);
  hasMorePages = signal<boolean>(true);
  isLoading = signal<boolean>(false);

  private readonly _apiKey = environment.API_KEY ;
  private readonly _apiUrl = environment.API_URL;
  // private readonly _searchTerm = signal<string>('');

  private readonly _http = inject(HttpClient);

  constructor() {
    this.getMovies();
    this.getTrending();
  }

  getMovieById( movieId: string ): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._apiUrl}/movie/${movieId}?api_key=${this._apiKey}`);
  }

  getMovies(): void {
    this._http.get<MovieResponse>(`${this._apiUrl}/movie/popular?api_key=${this._apiKey}`)
      .pipe(
        tap((response) => {
          const currentMovies = this.movies();
          this.movies.set([...currentMovies, ...response.results]);
          this.hasMorePages.set(response.page < response.total_pages);
          this.currentPage.update((currentPage) => currentPage + 1);
          this.isLoading.set(false);
        }))
      .subscribe();
  }

  setRandomMovie() {
    const trendingLength = this.trendingMovies().length;
    const randomIndex = this._getRandomInt(0, trendingLength);
    const randomMovie = this.trendingMovies()[randomIndex];
    this.selectedMovie.set(randomMovie);
  }

  getTrending(): void {
    this._http.get<MovieResponse>(`${this._apiUrl}/trending/movie/day?api_key=${this._apiKey}`)
      .pipe(
        tap((movies: MovieResponse) => this.trendingMovies.set(movies.results)),
        tap(() => this.setRandomMovie())
      )
      .subscribe();
  }

  searchMovie( query: string ): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._apiUrl}/search/movie?api_key=${this._apiKey}&query=${query}`);
  }

  private _getRandomInt(min = 0, max = 50): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
