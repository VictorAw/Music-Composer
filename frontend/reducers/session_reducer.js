import { RECEIVE_CURRENT_USER, LOGOUT, RECEIVE_ERRORS } from "../actions/session_actions";
import _ from "lodash";

const _nullUser = {
  currentUser: null,
  errors: []
};

const SessionReducer = (oldState=_nullUser, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_CURRENT_USER: {
      return _.merge({}, oldState, { currentUser: action.currentUser });
    }
    case LOGOUT: {
      return _.merge({}, _nullUser);
    }
    case RECEIVE_ERRORS: {
      return _.merge({}, oldState, { errors: action.errors });
    }
    default: {
      return oldState;
    }
  }
};

export default SessionReducer;
