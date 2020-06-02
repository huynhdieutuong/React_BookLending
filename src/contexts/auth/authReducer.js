import {
  SET_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_AVATAR,
  CHANGE_AVATAR,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOADING_AVATAR:
      return {
        ...state,
        loadingAvatar: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        loading: false,
        token: payload.token,
      };
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case CHANGE_AVATAR:
      return {
        ...state,
        loadingAvatar: false,
        user: payload ? payload : state.user,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
