import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = ({ MenuItems }) => {
  const [isMenuClicked, setIsMenuClick] = useState(false);

  return (
    <nav className="navbar-items">
      <a className="navbar-logo" href="/">
        <i className="fab fa-react"></i> Pokédex
      </a>
      <div className="menu-icon" onClick={() => setIsMenuClick(!isMenuClicked)}>
        <i className={isMenuClicked ? " fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={isMenuClicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
