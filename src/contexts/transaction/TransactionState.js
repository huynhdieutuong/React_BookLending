import React, { useReducer } from 'react';
import axios from 'axios';

import {
  SET_LOADING,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  NOT_FOUND,
  SET_LOADING_MODAL,
  LOAD_ADMIN_DATAS,
  CREATE_TRANSACTION,
} from '../types';

import TransactionContext from './transactionContext';
import TransactionReducer from './transactionReducer';

const TransactionState = (props) => {
  const initialState = {
    loading: false,
    loadingModal: false,
    transactions: [],
    transaction: {},
    pagination: {},
    daysBorrow: 14 * 24 * 60 * 60 * 1000,
    adminDatas: null,
  };

  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  const {
    loading,
    loadingModal,
    transactions,
    transaction,
    pagination,
    daysBorrow,
    adminDatas,
  } = state;

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Set Loading Modal
  const setLoadingModal = () => dispatch({ type: SET_LOADING_MODAL });

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
    setLoadingModal();

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

  return (
    <TransactionContext.Provider
      value={{
        loading,
        loadingModal,
        transactions,
        transaction,
        pagination,
        daysBorrow,
        adminDatas,
        getTransactions,
        getTransaction,
        loadAdminDatas,
        createTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
