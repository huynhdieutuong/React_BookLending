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
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_AVATAR,
  LOADING_AVATAR,
  EDIT_PROFILE,
} from '../types';

import AlertContext from '../alert/alertContext';
import CartContext from '../cart/cartContext';

import setAuthToken from '../../utils/setAuthToken';

const AuthState = (props) => {
  const { setAlert } = useContext(AlertContext);
  const { getCart, resetCart } = useContext(CartContext);

  const initialState = {
    loading: false,
    loadingAvatar: false,
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { loading, loadingAvatar, user, isAuthenticated } = state;

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Set Loading Avatar
  const setLoadingAvatar = () => dispatch({ type: LOADING_AVATAR });

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

      getCart();
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

  // Login
  const loginSocial = async (method, userID, accessToken) => {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        '/api/auth/login-social',
        { method, userID, accessToken },
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

  // Register
  const register = async (email, name, phone, password, password2) => {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        '/api/auth/register',
        { email, name, phone, password, password2 },
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL });

      setAlert(err.response.data.errors, 'error');
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
    resetCart();
  };

  // Change Avatar
  const changeAvatar = async (formData) => {
    setLoadingAvatar();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const res = await axios.put('/api/profile/avatar', formData, config);

      dispatch({
        type: CHANGE_AVATAR,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: CHANGE_AVATAR });

      setAlert(err.response.data.errors, 'error');
    }
  };

  // Edit Profile
  const editProfile = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put('/api/profile/update', formData, config);

      dispatch({
        type: EDIT_PROFILE,
        payload: res.data,
      });

      setAlert(['Profile Updated'], 'success');
    } catch (err) {
      console.log(err);
    }
  };

  // Change Password
  const changePassword = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put('/api/profile/password', formData, config);

      setAlert(['Password Changed'], 'success');
      return true;
    } catch (err) {
      setAlert(err.response.data.errors, 'error');
    }
  };

  // Create Password
  const createPassword = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put('/api/profile/create-password', formData, config);

      setAlert(['Password Created'], 'success');
      return true;
    } catch (err) {
      setAlert(err.response.data.errors, 'error');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        loadingAvatar,
        isAuthenticated,
        user,
        login,
        loginSocial,
        loadUser,
        logout,
        register,
        changeAvatar,
        editProfile,
        changePassword,
        createPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
