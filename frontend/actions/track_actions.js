export const REQUEST_TRACK = "REQUEST_TRACK";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const CREATE_TRACK = "CREATE_TRACK";
export const UPDATE_TRACK = "UPDATE_TRACK";
export const DELETE_TRACK = "DELETE_TRACK";
export const PLAY_TRACK = "PLAY_TRACK";
export const PLAYING_TRACK = "PLAYING_TRACK";
export const ADD_NOTE_TO_TRACK = "ADD_NOTE_TO_TRACK";
export const REMOVE_NOTE_FROM_TRACK = "REMOVE_NOTE_FROM_TRACK";

export const createTrack = (track) => ({
  type: CREATE_TRACK,
  track
});

export const requestTrack = (id) => ({
  type: REQUEST_TRACK,
  id,
});

export const receiveTrack = (track) => ({
  type: RECEIVE_TRACK,
  track
});

export const updateTrack = (track) => ({
  type: UPDATE_TRACK,
  track
});

export const deleteTrack = (id) => ({
  type: DELETE_TRACK,
  id
});

export const playTrack = () => ({
  type: PLAY_TRACK,
});

export const playingTrack = (track) => ({
  type: PLAYING_TRACK,
  track
});

export const addNoteToTrack = (note) => ({
  type: ADD_NOTE_TO_TRACK,
  note 
});

export const removeNoteFromTrack = (channel_idx, note_idx) => ({
  type: REMOVE_NOTE_FROM_TRACK,
  channel_idx,
  note_idx
});

