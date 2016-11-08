import { connect } from "react-redux";
import TracksListItem from "./tracks_list_item";
import { requestTrack, playTrack} from "../../actions/track_actions";

function mapStateToProps(state) {
  return {
    track: state.track,
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestTrack: id => dispatch(requestTrack(id)),
    playTrack: () => dispatch(playTrack())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksListItem);
