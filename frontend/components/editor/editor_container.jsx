import { connect } from "react-redux";
import Editor from "./editor";
import { requestTrack,
         createTrack,
         updateTrack,
         addNoteToTrack, 
         updateNoteInTrack,
         removeNoteFromTrack } 
  from "../../actions/track_actions";

function mapStateToProps(state) {
  return {
    player: state.player,
    track: state.track
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createTrack: (track) => dispatch(createTrack(track)),
    requestTrack: (id) => dispatch(requestTrack(id)),
    updateTrack: (track) => dispatch(updateTrack)
    addNoteToTrack: (ch, note) => dispatch(addNoteToTrack(ch, note)),
    updateNoteInTrack: (ch, nIdx, note) => dispatch(updateNoteInTrack(ch, nIdx, note)),
    removeNoteFromTrack: (ch, nIdx) => dispatch(removeNoteFromTrack(ch, nIdx))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
