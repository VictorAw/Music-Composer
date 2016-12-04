import { connect } from "react-redux";
import Editor from "./editor";
import { playTrack,
         requestTrack,
         createTrack,
         updateTrack,
         addNoteToTrack, 
         updateNoteInTrack,
         removeNoteFromTrack,
         addChannelToTrack,
         removeChannelFromTrack,
         updateTitle } 
  from "../../actions/track_actions";

function mapStateToProps(state) {
  return {
    player: state.player,
    track: state.track
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playTrack: () => dispatch(playTrack()),
    stopTrack: () => dispatch(stopTrack()),
    createTrack: (track) => dispatch(createTrack(track)),
    requestTrack: (id) => dispatch(requestTrack(id)),
    updateTrack: (track) => dispatch(updateTrack),
    addNoteToTrack: (ch, note) => dispatch(addNoteToTrack(ch, note)),
    updateNoteInTrack: (ch, nIdx, note) => dispatch(updateNoteInTrack(ch, nIdx, note)),
    removeNoteFromTrack: (ch, nIdx) => dispatch(removeNoteFromTrack(ch, nIdx)),
    addChannelToTrack: (channel) => dispatch(addChannelToTrack(channel)),
    removeChannelFromTrack: (channel_idx) => dispatch(removeChannelFromTrack(channel_idx)),
    updateTrackTitle: (title) => dispatch(updateTitle(title))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
