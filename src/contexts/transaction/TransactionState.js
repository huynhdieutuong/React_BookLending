import React, { useReducer } from 'react';
import axios from 'axios';

import {
  SET_LOADING,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  NOT_FOUND,
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
  };

  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  const { loading, transactions, transaction, pagination, daysBorrow } = state;

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

  return (
    <TransactionContext.Provider
      value={{
        loading,
        transactions,
        transaction,
        pagination,
        daysBorrow,
        getTransactions,
        getTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
