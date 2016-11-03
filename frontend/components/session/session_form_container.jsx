import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login, logout, signup } from "../../actions/session_actions";

function mapStateToProps({session}) {
  return {
    loggedIn: Boolean(session.currentUser),
    errors: session.errors
  }
}

function mapDispatchToProps(dispatch, {location}) {
  const formType = location.pathname.slice(1);
  const processForm = (formType === "login") ? login : signup;

  return {
    processForm: user => dispatch(processForm(user)),
    formType
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);

