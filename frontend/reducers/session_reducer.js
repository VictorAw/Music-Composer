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
      let newState = _.merge({}, oldState, { currentUser: action.currentUser });
      return newState;
    }
    case LOGOUT: {
      return _.merge({}, _nullUser);
    }
    case RECEIVE_ERRORS: {
      let newState = _.merge({}, oldState, { errors: action.errors });
      console.log(newState); 
      return newState;
    }
    default: {
      return oldState;
    }
  }
};

export default SessionReducer;
