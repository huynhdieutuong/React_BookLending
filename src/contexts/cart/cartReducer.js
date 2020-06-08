import { GET_CART, ADD_TO_CART, RESET_CART } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
    case ADD_TO_CART:
      return {
        ...state,
        cart: payload,
      };
    case RESET_CART:
      return {
        ...state,
        cart: null,
      };
    default:
      return state;
  }
};
