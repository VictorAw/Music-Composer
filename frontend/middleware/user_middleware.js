import { fetchUser } from "../utils/user_utils";
import { receiveUser } from "../actions/user_actions";
import { REQUEST_USER } from "../actions/user_actions";

const UserMiddleware = ({getState, dispatch}) => next => action => {
  const successCallback = (user) => (dispatch(receiveUser(user)));
  const errorCallback = (err) => (console.log(err));

  switch(action.type) {
    case REQUEST_USER: {
      fetchUser(action.id, successCallback);
      return next(action);
    } 
    default: {
      return next(action);
    }
  }
};

export default UserMiddleware;
