import { PLAYING_TRACK } from "../actions/player_actions";
import _ from "lodash";

const PlayerReducer = (oldState={track: {}}, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case PLAYING_TRACK: {
      //console.log("merging");
      //console.log(_.merge({}, oldState));
      //console.log(_.merge({}, oldState, {track: action.track}));
      //console.log("done merging");
      return _.merge({}, oldState, {track: action.track});
    }
    default: {
      return oldState;
    }
  }
};

export default PlayerReducer;
