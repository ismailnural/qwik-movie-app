import { createContext } from '@builder.io/qwik';

export type BasketItem = {
  movieId: string;
  name: string;
  quantity: number;
};

export type BasketState = {
  items: BasketItem[];
};

export const BasketContext = createContext<BasketState>('basket-context');
