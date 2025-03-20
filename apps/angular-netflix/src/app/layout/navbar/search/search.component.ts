import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { rxResource } from '@angular/core/rxjs-interop'
import { Movie } from '../../../features/movies/models/movies.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    DatePipe
  ],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {

  searchQuery = signal<string>('');

  private readonly _router = inject(Router);
  private readonly _moviesService = inject(MoviesService);

  filteredMovies = rxResource({
    request: this.searchQuery,
    // request: () => this.searchQuery(),
    loader: () => this._moviesService.searchMovie(this.searchQuery())
  });

  movies = linkedSignal(() => this.filteredMovies.value()?.results ?? ([] as Movie[]))
  // movies = computed(() => this.filteredMovies.value()?.results ?? ([] as Movie[]))

  getImage(posterPath: string): string {
    return posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : './assets/poster-placeholder.png'
  }

  onSearchInput( event: Event ): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  goToDetails(movieId: string): void {
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  private _clearQuery(): void {
    this.searchQuery.set('')
  }

}
