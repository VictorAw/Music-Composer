import { connect } from "react-redux";
import { logout } from "../../../actions/session_actions";
import HeaderButtons from "./header_buttons";

function mapStateToProps({session}) {
  return {
    currentUser: session.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(HeaderButtons);

