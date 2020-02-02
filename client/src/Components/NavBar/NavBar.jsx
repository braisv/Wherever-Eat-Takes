import React from "react";
import Burger from "../Burger/Burger";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSearch,
  faSignOutAlt,
  faHome,
  faPen,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.scss";

const NavBar = ({ title, user, logout }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
        <p>{title}</p>
        <span className="icons">
        <Link className="link min-width" to="/">
            <FontAwesomeIcon icon={faHome} size="3x" />
          </Link>
          <Link className="link min-width" to="/favourites">
            <FontAwesomeIcon icon={faStar} size="3x" />
          </Link>
          <Link className="link min-width" to="/edit">
            <FontAwesomeIcon icon={faPen} size="3x" />
          </Link>
          <Link className="link" to="/search">
            <FontAwesomeIcon icon={faSearch} size="3x" />
          </Link>
          </span>
        {user ? (
          <FontAwesomeIcon icon={faSignOutAlt} size="3x" onClick={logout} />
          ) : (
            <Link className="link" to="/login">
            <FontAwesomeIcon icon={faUserCircle} size="3x" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
