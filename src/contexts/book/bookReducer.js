import {
  SET_LOADING,
  GET_BOOKS,
  GET_BOOK,
  NOT_FOUND,
  CREATE_BOOK,
  DELETE_BOOK,
  EDIT_BOOK,
  EDIT_BOOK_SINGLE,
  SET_BOOK,
} from '../types';

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
    case CREATE_BOOK:
      return {
        ...state,
        books: [payload, ...state.books],
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== payload),
      };
    case EDIT_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === payload._id ? payload : book
        ),
      };
    case EDIT_BOOK_SINGLE:
    case SET_BOOK:
      return {
        ...state,
        book: payload,
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
