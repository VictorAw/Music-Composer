import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login, 
         logout, 
         signup, 
         clearErrors } from "../../actions/session_actions";

function mapStateToProps({session}) {
  return {
    currentUser: session.currentUser,
    errors: session.errors
  }
}

function mapDispatchToProps(dispatch, {location}) {
  let success = () => {

  }
  return {
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);

