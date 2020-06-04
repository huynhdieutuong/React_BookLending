import { SET_LOADING, GET_BOOKS, GET_BOOK, NOT_FOUND } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_BOOKS:
      return {
        ...state,
        books: payload.books,
        pagination: payload.pagination,
        loading: false,
      };
    case GET_BOOK:
      return {
        ...state,
        book: payload,
        loading: false,
      };
    case NOT_FOUND:
      return {
        ...state,
        book: null,
        loading: false,
      };
    default:
      return state;
  }
};
