import { createContext } from 'react';

export const UserContext = createContext({
  cartList: [],
  setcartList: () => {},
  cartDetail: { subcost: 0, discount: 0, tax: 0, total: 0 },
  setCartDetail: () => {},
  hash: new Map(),
  setHash: () => {},
  searchList: new Set(['All']),
  setsearchList: () => {},
  SearchcartList: [],
  setSearchcartList: () => {},
  login: false,
  setLogin: () => {},
  user: null,
  setUser: () => {}
});