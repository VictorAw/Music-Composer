import { connect } from "react-redux";
import Profile from "./profile";
import { requestTrack, playTrack } from "../../actions/track_actions";

function mapStateToProps(state) {
  return {
    selectedUser: state.user.selectedUser
  };
}

export default connect(
  mapStateToProps
)(Profile);
