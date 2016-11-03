import React from "react";
import { Link } from "react-router";

const NavBar = () => (
  <nav className="navbar">
    <Link to="/edit">Create Music!</Link>
  </nav> 
);

export default NavBar;
