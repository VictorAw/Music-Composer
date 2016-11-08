import { RECEIVE_TRACK } from "../actions/track_actions";
import _ from "lodash";

const _emptyTrack = {
  id: null,
  title: "Untitled",
  bpm: 60,
  length: 0,
  channels: []
};

const TrackReducer = (oldState=_emptyTrack, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_TRACK: {
      return _.merge({}, oldState, action.track);
    }
    default: {
      return oldState;
    }
  }
};

export default  TrackReducer;
