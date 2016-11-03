import React from "react";
import { Link } from "react-router";
import HeaderButtonsContainer from "./header_buttons/header_buttons_container";

const Header = ({ children }) => (
  <header id="header-bar-container" className="header-bar-container">
    <nav className="header-bar">
      <Link to="/">Music Composer</Link>
      <HeaderButtonsContainer />
    </nav>
    { children }
  </header> 
);

export default Header;
