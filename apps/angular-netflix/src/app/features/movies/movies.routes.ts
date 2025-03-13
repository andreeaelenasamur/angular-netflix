import { Routes } from "@angular/router";

const moviesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./movies.component').then((m) => m.MoviesComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./movie-details/movie-details.component').then((m) => m.MovieDetailsComponent),
  }
];

export { moviesRoutes };
