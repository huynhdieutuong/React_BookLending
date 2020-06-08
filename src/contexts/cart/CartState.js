import React, { useReducer } from 'react';
import axios from 'axios';

import CartContext from './cartContext';
import CartReducer from './cartReducer';
import {
  GET_CART,
  ADD_TO_CART,
  RESET_CART,
  CHANGE_QUANTITY,
  REMOVE_BOOK,
} from '../types';

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

  // Change quantity
  const changeQuantity = async (bookId, number) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/cart/number/${bookId}`,
      { number },
      config
    );

    dispatch({
      type: CHANGE_QUANTITY,
      payload: res.data,
    });
  };

  // Remove book in cart
  const removeBook = async (bookId) => {
    const res = await axios.put(`/api/cart/delete/${bookId}`);

    dispatch({
      type: REMOVE_BOOK,
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
        changeQuantity,
        removeBook,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
