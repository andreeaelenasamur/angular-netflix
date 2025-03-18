export interface Movie {
  id: string;
  title: string;
  poster: string;
  poster_path: string;
  backdrop: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
