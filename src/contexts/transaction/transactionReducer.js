import {
  SET_LOADING,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  NOT_FOUND,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload.transactions,
        pagination: payload.pagination,
        loading: false,
      };
    case GET_TRANSACTION:
      return {
        ...state,
        transaction: payload,
        loading: false,
      };
    case NOT_FOUND:
      return {
        ...state,
        transaction: null,
        loading: false,
      };
    default:
      return state;
  }
};
