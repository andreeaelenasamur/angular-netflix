import { Component, effect, inject } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {

  private readonly _moviesService = inject(MoviesService);

  readonly movies = this._moviesService.movies;

  constructor() {
    effect(() => {
      console.log(this.movies());
    });
  }

}
