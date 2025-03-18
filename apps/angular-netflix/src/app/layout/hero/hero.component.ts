import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../features/movies/models/movies.interface';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {

  movie = input.required<Movie>();


}
