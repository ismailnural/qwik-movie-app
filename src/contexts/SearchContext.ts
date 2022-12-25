import { createContext } from '@builder.io/qwik';

export type SearchState = {
  query?: string;
  page?: number;
};

export const SearchContext = createContext<SearchState>('search-context');
