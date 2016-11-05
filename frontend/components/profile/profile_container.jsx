import { connect } from "react-redux";
import Profile from "./profile";
import { requestTrack, playTrack } from "../../actions/track_actions";

function mapStateToProps(state) {
  return {
    selectedUser: state.user.selectedUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestUser: (id) => dispatch(requestUser(id))
  }
}

export default connect(
  mapStateToProps
)(Profile);
