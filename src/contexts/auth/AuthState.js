import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import { SET_LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

import AlertContext from '../alert/alertContext';

const AuthState = (props) => {
  const { setAlert } = useContext(AlertContext);

  const initialState = {
    loading: false,
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { loading, user, isAuthenticated } = state;

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Login
  const login = async (email, password) => {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        '/api/auth/login',
        { email, password },
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL });

      setAlert(err.response.data.errors, 'error');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        user,
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
