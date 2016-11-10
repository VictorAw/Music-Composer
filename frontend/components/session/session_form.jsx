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

  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType) {
      this.props.clearErrors();
    }
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  redirectLink() {
    if (this.props.formType === "login") {
      return (
        <div className="session-redirect-link">
          <p>{"Don't have an account?"}</p>
          <Link to="/signup">Sign up!</Link>
        </div>
      );
    }
    else {
      return (
        <div className="session-redirect-link">
          <p>{"Already have an account?"}</p>
          <Link to="/login">Log in!</Link>
        </div> 
      );
    }
  }

  emailInput() {
    if (this.props.formType === "signup") {
      return (
        <div className="session-form-email">
          <label id="email-field" className="login-field">
            <input id="email-input" 
            className="login-input"
            placeholder="Email"
            onChange={this.update("email")} />
          </label>
          { this.errors("Email") }
        </div>
      );
    }
  }

  guestLogin() {
    return (
      <div className="session-redirect-link">
        <p>{"Want to take a tour?"}</p>
        <Link to="#" onClick={this.handleGuestLogin}>Guest login!</Link>
      </div>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === "login") {
      this.props.login({user: this.state});
    }
    else {
      this.props.signup({user: this.state});
    }
  }

  handleGuestLogin(e) {
    e.preventDefault();
    this.props.login({user: {username: "Guest", password: "tour_account"}});
  }

  update(field) {
    return (e) => (this.setState({[field]: e.currentTarget.value}));
  }

  errors(containedWord) {
    return (
      this.props.errors.map((error) => {
        if (error.includes(containedWord)) {
          return (<p key={error} className="login-errors">{error}</p>)
        }
      })
    )
  }

  render() {
    let title = (this.props.formType === "login") ? "Log in" : "Sign up";
    return (
      <form onSubmit={this.handleSubmit} className="login-form" id="login-form">
        <h1>{title}</h1>
        { this.redirectLink() }
        { this.guestLogin() }

        <div className="session-inputs">
          { this.emailInput() }

          <div className="session-form-username">
            <label id="username-field" className="login-field">
              <input id="username-input" 
                     className="login-input"
                     placeholder="Username"
                     onChange={this.update("username")} />
            </label>
            { this.errors("Username") }
          </div>

          <div className="session-form-password">
            <label id="password-field" className="login-field">
              <input id="password-input"
                     type="password"
                     className="login-input"
                     placeholder="Password"
                     onChange={this.update("password")} />
            </label>
            { this.errors("Password") }
          </div>
        
        </div>
        <input type="submit" 
               className="login-submit"
               value="Submit" />
      </form> 
    );
  }
}

export default SessionForm;
