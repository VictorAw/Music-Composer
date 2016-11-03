import React from "react";
import { Link } from "react-router";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      description: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  redirectLink() {
    if (this.props.formType === "login") {
      return (
        <div id="form-redirect-link">{"Don't have an account?"}<Link to="/signup">Sign up!</Link></div>
      );
    }
    else {
      return (
        <div id="form-redirect-link">{"Already have an account?"}<Link to="/login">Log in!</Link></div> 
      );
    }
  }

  emailField() {
    if (this.props.formType === "signup") {
      return (
        <label id="email-field" className="login-field">
          Email:
          <input id="email-input" 
          className="login-input"
          onChange={this.update("email")} />
        </label>
      );
    }
  }

  descriptionField() {
    if (this.props.formType === "signup") {
      return (
        <label id="description-field" className="description-field">
          Description:
          <textarea id="description-input"
                    className="description-input"
                    onChange={this.update("description")} />
        </label>
      );
    }
  }

  guestLogin() {
    return (
      <div id="guest-login-link">{"Want to take a tour?"}<Link to="/login" onClick={this.handleGuestLogin}>Guest login!</Link></div>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm({user: this.state});
  }

  handleGuestLogin(e) {
    e.preventDefault();
    this.props.processForm({user: {username: "Guest", password: "tour_account"}});
  }

  update(field) {
    return (e) => (this.setState({[field]: e.currentTarget.value}));
  }

  render() {
    let title = (this.props.formType === "login") ? "Log in" : "Sign up";
    console.log(this.props.errors.full_messages);
    return (
      <form onSubmit={this.handleSubmit} className="login-form" id="login-form">
        {title}
        <label id="username-field" className="login-field">
          Username:
          { this.redirectLink() }
          { this.guestLogin() }
          <input id="username-input" 
                 className="login-input"
                 onChange={this.update("username")} />
        </label>

        { this.emailField() }

        <label id="password-field" className="login-field">
          Password:
          <input id="password-input"
                 className="login-input"
                 onChange={this.update("password")} />
        </label>

        { this.descriptionField() }

        <input type="submit" 
               id="login-submit" 
               className="login-submit"
               value="Submit" />
      </form> 
    );
  }
}

export default SessionForm;
