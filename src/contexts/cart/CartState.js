import React, { useReducer } from 'react';
import axios from 'axios';

import CartContext from './cartContext';
import CartReducer from './cartReducer';
import { GET_CART, ADD_TO_CART, RESET_CART } from '../types';

const CartState = (props) => {
  const initialState = {
    cart: null,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const { cart } = state;

  // Get Cart
  const getCart = async () => {
    const res = await axios.get('/api/cart');

    dispatch({
      type: GET_CART,
      payload: res.data,
    });
  };

  // Reset Cart
  const resetCart = () => dispatch({ type: RESET_CART });

  // Add to Cart
  const addToCart = async (id) => {
    const res = await axios.put(`/api/cart/add/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        resetCart,
        addToCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
