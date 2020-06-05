import React, { useReducer } from 'react';
import axios from 'axios';

import {
  SET_LOADING,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  NOT_FOUND,
  LOAD_ADMIN_DATAS,
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  EDIT_TRANSACTION_SINGLE,
} from '../types';

import TransactionContext from './transactionContext';
import TransactionReducer from './transactionReducer';

const TransactionState = (props) => {
  const initialState = {
    loading: false,
    transactions: [],
    transaction: {},
    pagination: {},
    daysBorrow: 14 * 24 * 60 * 60 * 1000,
    adminDatas: null,
  };

  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  const {
    loading,
    transactions,
    transaction,
    pagination,
    daysBorrow,
    adminDatas,
  } = state;

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Get Transactions
  const getTransactions = async (text = '', page = 1, perPage = 5) => {
    setLoading();

    const res = await axios.get(
      `/api/transactions?page=${page}&perPage=${perPage}&q=${text}`
    );

    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data,
    });
  };

  // Get Transaction
  const getTransaction = async (id) => {
    setLoading();

    try {
      const res = await axios.get(`/api/transactions/${id}/view`);

      dispatch({
        type: GET_TRANSACTION,
        payload: res.data,
      });
    } catch (err) {
      if (err.response.status === 404) {
        dispatch({ type: NOT_FOUND });
      }
    }
  };

  // Load admin datas
  const loadAdminDatas = async () => {
    try {
      const res1 = await axios.get('/api/users');
      const res2 = await axios.get('/api/books');

      dispatch({
        type: LOAD_ADMIN_DATAS,
        payload: { users: res1.data.users, books: res2.data.books },
      });
    } catch (err) {
      console.error(err.response);
    }
  };

  // Create Transaction
  const createTransaction = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        '/api/transactions/create',
        formData,
        config
      );

      dispatch({
        type: CREATE_TRANSACTION,
        payload: res.data,
      });
    } catch (err) {
      console.error(err.response);
    }
  };

  // Delete Transaction
  const deleteTransaction = async (id, history) => {
    try {
      await axios.delete(`/api/transactions/${id}/delete`);

      dispatch({
        type: DELETE_TRANSACTION,
        payload: id,
      });

      if (history) {
        history.push('/transactions');
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  // Edit Transaction
  const editTransaction = async (id, formData, single = false) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/transactions/${id}/edit`,
        formData,
        config
      );

      dispatch({
        type: single ? EDIT_TRANSACTION_SINGLE : EDIT_TRANSACTION,
        payload: res.data,
      });
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        loading,
        transactions,
        transaction,
        pagination,
        daysBorrow,
        adminDatas,
        getTransactions,
        getTransaction,
        loadAdminDatas,
        createTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
