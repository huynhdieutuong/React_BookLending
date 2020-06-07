import {
  SET_LOADING,
  GET_USERS,
  GET_USER,
  NOT_FOUND,
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  EDIT_USER_SINGLE,
  SET_USER,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload.users,
        pagination: payload.pagination,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: payload.user,
        transactions: payload.transactions,
        loading: false,
      };
    case NOT_FOUND:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [payload, ...state.users],
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload._id ? payload : user
        ),
      };
    case EDIT_USER_SINGLE:
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
