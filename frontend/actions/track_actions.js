export const REQUEST_TRACK = "REQUEST_TRACK";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const UPDATE_TRACK = "UPDATE_TRACK";
export const PLAY_TRACK = "PLAY_TRACK";
export const DELETE_TRACK = "DELETE_TRACK";

export const requestTrack = (id) => ({
  type: REQUEST_TRACK,
  id
});

export const receiveTrack = (track) => ({
  type: RECEIVE_TRACK,
  track
});

export const updateTrack = (track) => ({
  type: UPDATE_TRACK,
  track
});

export const playTrack = (track) => ({
  type: PLAY_TRACK,
  track
});

export const deleteTrack = (id) => ({
  type: DELETE_TRACK,
  id
});

