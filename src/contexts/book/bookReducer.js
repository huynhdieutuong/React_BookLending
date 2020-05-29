import { SET_LOADING, SET_TEXT_SEARCH, GET_BOOKS } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_TEXT_SEARCH:
      return {
        ...state,
        textSearch: payload,
      };
    case GET_BOOKS:
      return {
        ...state,
        books: payload.books,
        pagination: payload.pagination,
        loading: false,
      };
    default:
      return state;
  }
};
