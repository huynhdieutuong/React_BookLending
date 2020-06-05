import {
  SET_LOADING,
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  NOT_FOUND,
  SET_LOADING_MODAL,
  LOAD_ADMIN_DATAS,
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADING_MODAL:
      return {
        ...state,
        loadingModal: true,
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
    case LOAD_ADMIN_DATAS:
      return {
        ...state,
        loadingModal: false,
        adminDatas: payload,
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== payload
        ),
      };
    default:
      return state;
  }
};
