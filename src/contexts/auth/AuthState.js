import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  SET_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from '../types';

import AlertContext from '../alert/alertContext';

import setAuthToken from '../../utils/setAuthToken';

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

  // Load User
  const loadUser = async () => {
    setLoading();

    setAuthToken(localStorage.getItem('token'));

    try {
      const res = await axios.get('/api/profile');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

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

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL });

      setAlert(err.response.data.errors, 'error');
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        user,
        login,
        loadUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
