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
    let formStyling = this.props.currentUser ? "profile-logout" : "login-signup";
    return (
      <nav className={ "header-buttons " + formStyling }>
        <Link to="" onClick={this.showLogin}>Login</Link>
        <Link to="" onClick={this.showSignUp}>Sign up!</Link>
      </nav>
    );
  }

  signedIn() {
    let formStyling = this.props.currentUser ? "profile-logout" : "login-signup";
    return (
      <nav className={ "header-buttons " + formStyling }>
        <h2 className="header-name">Hi, </h2>
        <Link to={`/users/${this.props.currentUser.id}/profile`}>{this.props.currentUser.username}!</Link>
        <Link to="/" onClick={this.props.logout}>Log Out!</Link> 
      </nav>
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
          formType="login"
          closeModal={this.hideModal}/> 
      );
    }
    else if (this.state.showModal == "signup") {
      return (
        <SessionFormContainer 
          formType="signup"
          closeModal={this.hideModal}/> 
      );
    }
    else {
      return;
    }
  }

  render() {
    return (
      <div className="header-buttons-container">
        { this.props.currentUser ? this.signedIn() : this.signedOut() }
        <Modal
          showModal={this.state.showModal}
          closeModal={this.hideModal}>
          { this.loginForm() }
        </Modal>
      </div>   
    );
  }
}

export default HeaderButtons
