export const REQUEST_ALL_USERS = "REQUEST_ALL_USERS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const REMOVE_USER = "REMOVE_USER";

export const requestAllUsers = () => ({
  type: REQUEST_ALL_USERS  
});

export const requestUser = (id) => ({
  type: REQUEST_USER,
  id
});

export const receiveAllUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user
});

