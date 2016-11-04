import { fetchTrack, updateTrack, deleteTrack } from "../utils/track_utils";
import { REQUEST_TRACK, UPDATE_TRACK, DELETE_TRACK } from "../actions/track_actions";
import { receiveTrack } from "../actions/track_actions";

const TrackMiddleware = ({ getState, dispatch }) => next => action => {
  const successCallback = (track) => (dispatch(receiveTrack(track)));

  switch(action.type) {
    case REQUEST_TRACK: {
      fetchTrack(action.track, successCallback);
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
    default: {
      return next(action);
    }
  }
};

export default TrackMiddleware;
