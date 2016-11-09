import { RECEIVE_USER } from "../actions/user_actions";
import _ from "lodash";

const _nullUsers = {
  users: {},
  selectedUser: {tracks: []}
};

const UserReducer = (oldState=_nullUsers, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_USER: {
      return _.merge({}, { users: oldState.users }, { selectedUser: action.user });
    }
    default: {
      return oldState;
    }
  }
}

export default UserReducer;
