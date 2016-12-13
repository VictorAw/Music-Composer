import { PLAYING_TRACK } from "../actions/player_actions";
import _ from "lodash";

const defaultState = {
  track: null
};

const PlayerReducer = (oldState=defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case PLAYING_TRACK: {
      return _.merge({}, oldState, {track: action.track});
    }
    default: {
      return oldState;
    }
  }
};

export default PlayerReducer;
