import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import BookReducer from './bookReducer';
import { SET_LOADING, GET_BOOKS } from '../types';

const BookState = (props) => {
  const initialState = {
    books: [],
    book: {},
    pagination: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const { books, book, loading, pagination } = state;

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Get books
  const getBooks = async (page = 1) => {
    setLoading();

    const res = await axios.get(`/api/books?page=${page}`);

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  };

  return (
    <BookContext.Provider
      value={{
        books,
        book,
        loading,
        pagination,
        getBooks,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
