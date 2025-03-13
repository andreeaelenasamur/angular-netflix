import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent {
  // movieId = this.route.snapshot.params['movieId'];
  movieId = input.required<string>();

}
