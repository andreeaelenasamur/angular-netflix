import { Injectable, signal } from '@angular/core';
import { Movie } from './models/movie.interface';

@Injectable({providedIn: 'root'})
export class MoviesService {

  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);

}