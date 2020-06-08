import {
  GET_CART,
  ADD_TO_CART,
  RESET_CART,
  CHANGE_QUANTITY,
  REMOVE_BOOK,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
    case ADD_TO_CART:
    case CHANGE_QUANTITY:
    case REMOVE_BOOK:
      return {
        ...state,
        cart: payload,
      };
    case RESET_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
