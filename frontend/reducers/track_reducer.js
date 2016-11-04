import { RECEIVE_TRACK, PLAY_TRACK } from "../actions/track_actions";
import _ from "lodash";

const _emptyTrack = {
  title: "Untitled",
  notes: [[[]]]
};

const TrackReducer = (oldState=_emptyTrack, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_TRACK: {
      return _.merge({}, oldState, { track: action.track });
    }
    case PLAY_TRACK: {
      console.log("Doot Doot Doot. Music should play eventually");
      return oldState;
    }
    default: {
      return oldState;
    }
  }
};

export default  TrackReducer;
