import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import BookReducer from './bookReducer';
import { SET_LOADING, GET_BOOKS, GET_BOOK, NOT_FOUND } from '../types';

const BookState = (props) => {
  const initialState = {
    loading: false,
    books: [],
    book: {},
    pagination: {},
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const { books, book, loading, pagination } = state;

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Get books
  const getBooks = async (text = '', page = 1, perPage = 10) => {
    setLoading();

    const res = await axios.get(
      `/api/books?page=${page}&perPage=${perPage}&q=${text}`
    );

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  };

  // Get book
  const getBook = async (id) => {
    setLoading();

    try {
      const res = await axios.get(`/api/books/${id}/view`);

      dispatch({
        type: GET_BOOK,
        payload: res.data,
      });
    } catch (err) {
      if (err.response.status === 404) {
        dispatch({ type: NOT_FOUND });
      }
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        book,
        loading,
        pagination,
        getBooks,
        getBook,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
