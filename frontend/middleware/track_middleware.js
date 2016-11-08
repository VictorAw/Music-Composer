import { fetchTrack, updateTrack, deleteTrack } from "../utils/track_utils";
import { REQUEST_TRACK, UPDATE_TRACK, DELETE_TRACK, PLAY_TRACK } 
  from "../actions/track_actions";
import { receiveTrack, playingTrack } from "../actions/track_actions";
import Track from "../utils/synth_utils";

const TrackMiddleware = ({ getState, dispatch }) => next => action => {
  const successCallback = (track) => dispatch(receiveTrack(track));

  switch(action.type) {
    case REQUEST_TRACK: {
      fetchTrack(action.id, successCallback, (err) => console.log(err));
      return next(action);
    }
    case PLAY_TRACK: {
      let state = getState();
      let track = state.player.track;
      if (state.player.track.trackData === state.track &&
          !state.player.track.playing) {
        track.reset(); 
      }
      else if (state.player.track.trackData !== state.track) {
        track = new Track(state.track);
      }
      //console.log("Track middleware");
      //console.log(track);
      //console.log("End track middleware");
      dispatch(playingTrack(track));
      break;
    }
    case UPDATE_TRACK: {
      updateTrack(action.track, successCallback);
      return next(action);
    }
    case DELETE_TRACK: {
      deleteTrack(action.id, () => (next(action)));
      break;
    }
    default: {
      return next(action);
    }
  }
};

export default TrackMiddleware;
