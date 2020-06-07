import React, { useReducer, useContext } from 'react';
import axios from 'axios';

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

import UserContext from './userContext';
import UserReducer from './userReducer';

import AlertContext from '../alert/alertContext';

const UserState = (props) => {
  const { setAlert } = useContext(AlertContext);

  const initialState = {
    loading: false,
    users: [],
    user: {},
    pagination: {},
    transactions: [],
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const { loading, users, user, pagination } = state;

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Get Users
  const getUsers = async (text = '', page = 1, perPage = 5) => {
    setLoading();

    const res = await axios.get(
      `/api/users?page=${page}&perPage=${perPage}&q=${text}`
    );

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  };

  // Get User
  const getUser = async (id) => {
    setLoading();

    try {
      const res = await axios.get(`/api/users/${id}/view`);

      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      if (err.response.status === 404) {
        dispatch({ type: NOT_FOUND });
      }
    }
  };

  // Create User
  const createUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users/create', formData, config);

      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });

      return true;
    } catch (err) {
      setAlert(err.response.data.errors, 'error');
    }
  };

  // Delete User
  const deleteUser = async (id, history) => {
    try {
      await axios.delete(`/api/users/${id}/delete`);

      dispatch({
        type: DELETE_USER,
        payload: id,
      });

      if (history) {
        history.push('/users');
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  // Set User
  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

  // Edit User
  const editUser = async (id, formData, single = false) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/users/${id}/edit`, formData, config);

      dispatch({
        type: single ? EDIT_USER_SINGLE : EDIT_USER,
        payload: res.data,
      });

      return true;
    } catch (err) {
      setAlert(err.response.data.errors, 'error');
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        users,
        user,
        pagination,
        getUsers,
        getUser,
        createUser,
        deleteUser,
        setUser,
        editUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
