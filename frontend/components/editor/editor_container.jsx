import { connect } from "react-redux";
import Editor from "./editor";
import { requestTrack, addNoteToTrack, removeNoteFromTrack, updateTrack } 
  from "../../actions/track_actions";

function mapStateToProps(state) {
  return {
    player: state.player,
    track: state.track
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestTrack: (id) => dispatch(requestTrack(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
