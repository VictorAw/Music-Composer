import React from "react";
import { Link } from "react-router";

function signedIn(currentUser, logout) {
  return (
    <nav className="header-buttons profile-logout">
      <h2 className="header-name">Hi, </h2>
      <Link to="/users/{currentUser.id}">{currentUser.username}!</Link>
      <Link to="/" onClick={logout}>Log Out!</Link>
    </nav>
  );
}

function signedOut() {
  return (
    <nav className="header-buttons login-signup">
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up!</Link>
    </nav> 
  );
}

const HeaderButtons = ({currentUser, logout, router}) => (
  currentUser ? signedIn(currentUser, logout, router) : signedOut()
);

export default HeaderButtons
