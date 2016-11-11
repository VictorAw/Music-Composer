import React from "react";
import Header from "../header/header";
import NavBar from "../header/nav/nav_bar";

const MainLayout = ({children}) => (
  <div id="page-container" className="page-container"> 
    <header id="header-container" className="header-container">
      <Header />
      <NavBar />
    </header>
    { children }
  </div>
) 

export default MainLayout;
