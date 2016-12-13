import React from "react";
import { Link } from "react-router";
import Modal from "../../modal/modal";
import SessionFormContainer from "../../session/session_form_container";

class HeaderButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: "hidden"
    }

    this.showLogin = this.showLogin.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.signedOut = this.signedOut.bind(this);
    this.signedIn = this.signedIn.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  signedOut() {
    return (
      <div id="header-buttons-container">
        <Link to="" onClick={this.showLogin}>Login</Link>
        <Link to="" onClick={this.showSignUp}>Sign up!</Link>
      </div>
    );
  }

  signedIn() {
    return (
      <div id="header-buttons-container">
        <h2 className="header-name">Hi, </h2>
        <Link to={`/users/${this.props.currentUser.id}/profile`}>{this.props.currentUser.username}!</Link>
        <Link to="/" onClick={this.props.logout}>Log Out!</Link> 
      </div>
    );
  }

  showLogin(e) {
    e.preventDefault();
    this.setState({showModal: "login"});
  }

  showSignUp(e) {
    e.preventDefault();
    this.setState({showModal: "signup"});
  }

  hideModal() {
    this.setState({showModal: "hidden"});
  }

  loginForm() {
    if (this.state.showModal == "login") {
      return (
        <SessionFormContainer 
          formType="login"/> 
      );
    }
    else if (this.state.showModal == "signup") {
      return (
        <SessionFormContainer 
          formType="signup"/> 
      );
    }
    else {
      return;
    }
  }

  render() {
    let formStyling = this.props.currentUser ? "profile-logout" : "login-signup";

    return (
      <nav className={ "header-buttons" + formStyling }>
        { this.props.currentUser ? this.signedIn(this.props.currentUser, logout) : this.signedOut() }
        <Modal
          showModal={this.state.showModal}
          closeModal={this.hideModal}>
          { this.loginForm() }
        </Modal>
      </nav>   
    );
  }
}

export default HeaderButtons
