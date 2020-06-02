import React, { useReducer } from 'react';
import { SET_ALERT, REMOVE_ALERT } from '../types';

import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = (props) => {
  const initialState = {
    alerts: [],
    type: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const { alerts, type } = state;

  // Set Alert
  const setAlert = (alerts, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { alerts, type },
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 0);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts,
        type,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
