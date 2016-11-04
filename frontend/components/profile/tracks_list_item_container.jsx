import { connect } from "react-redux";
import TracksListItem from "./tracks_list_item";
import { requestTrack, playTrack } from "../../actions/track_actions";

function mapStateToProps(state) {
  return {
    track: state.track 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestTrack: (id) => dispatch(requestTrack(id)),
    playTrack: (track) => dispatch(playTrack(track))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksListItem);
