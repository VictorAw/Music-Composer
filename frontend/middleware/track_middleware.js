import { createTrack, 
         fetchTrack, 
         updateTrack, 
         deleteTrack } from "../utils/track_utils";
import { CREATE_TRACK, 
         REQUEST_TRACK, 
         UPDATE_TRACK, 
         DELETE_TRACK, 
         PLAY_TRACK,
         STOP_TRACK } from "../actions/track_actions";
import { receiveTrack, 
         playingTrack } from "../actions/track_actions";

import { Track } from "../utils/player_utils";

const TrackMiddleware = ({ getState, dispatch }) => next => action => {
  const successCallback = (track) => dispatch(receiveTrack(track));

  switch(action.type) {
    case CREATE_TRACK: {
      createTrack(action.track, () => { console.log("Successful create") });
      return next(action);
    }
    case REQUEST_TRACK: {
      fetchTrack(action.id, successCallback, (err) => console.log(err));
      return next(action);
    }
    case UPDATE_TRACK: {
      updateTrack(action.track, successCallback);
      return next(action);
    }
    case DELETE_TRACK: {
      deleteTrack(action.id, () => (next(action)));
      break;
    }
    case PLAY_TRACK: {
      let state = getState();
      let track = state.player.track;
      if (!state.player.track) {
        console.log("New track");
        track = new Track(state.track);
      }
      else if (state.player.track.trackData !== state.track) {
        console.log("Stopping old track. Creating new one");
        track.stop();
        track = new Track(state.track);
      }
      else {
        track.stop();
        track.reset(); 
      }
      
      dispatch(playingTrack(track));
      break;
    }
    case STOP_TRACK: {
      let state = getState();
      let track = state.player.track;
      if (track) {
        track.stop();
        dispatch(playingTrack(null));
      }
      break;
    }
    default: {
      return next(action);
    }
  }
};

export default TrackMiddleware;
