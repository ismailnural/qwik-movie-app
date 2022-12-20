export type PagedResponse<T> = {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieResponseType = {
  backdrop_path: string,
  genres: {
    id: number,
    name: string
  }[],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string,
  }[],
  production_countries: {
    iso_3166_1: string,
    name: string,
  }[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: {
    english_name: string,
    iso_639_1: string,
    name: string,
  }[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}

export type MoviesResponseType = PagedResponse<MovieResponseType>

export type MoviesResquestType = {
  page: string;
}

export type MovieVideosResultsType = {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: boolean,
  published_at: string,
  id: string,
}

export type MovieVideosResponseType = {
  id: number,
  results: MovieVideosResultsType[],
}
