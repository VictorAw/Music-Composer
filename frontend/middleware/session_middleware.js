import { login, logout, signup } from "../utils/session_utils";
import { LOGIN, LOGOUT, SIGNUP } from "../actions/session_actions";
import { receiveCurrentUser, receiveErrors } from "../actions/session_actions";

const SessionMiddleware = ({getState, dispatch}) => next => action => {
  const successCallback = (user) => (dispatch(receiveCurrentUser(user)));
  const errorCallback = (err) => (dispatch(receiveErrors(err.responseJSON)));

  switch(action.type) {
    case LOGIN: {
      login(action.user, successCallback, errorCallback);
      return next(action);
    }
    case LOGOUT: {
      logout(() => next(action), errorCallback);
      break; 
    }
    case SIGNUP: {
      signup(action.user, successCallback, errorCallback);
      return next(action);
    }
    default: {
      return next(action);
    }
  }
};

export default SessionMiddleware;
