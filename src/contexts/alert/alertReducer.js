import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: payload.alerts,
        type: payload.type,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: [],
        type: null,
      };
    default:
      return state;
  }
};
